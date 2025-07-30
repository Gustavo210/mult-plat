import { useIsFocused } from "@react-navigation/native";
import { PermissionResponse, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking } from "react-native";

export interface UseCameraOptions {
  isManualActivation?: boolean;
}

export interface UseCameraResult {
  status: "LOADING" | "NO_PERMISSION" | "UNAVAILABLE" | "READY";
  isPaused: boolean;
  permission: PermissionResponse | null;
  requestPermission: () => Promise<void>;
  reactivate: () => void;
  isScanningActive: boolean;
  activateManualScan: () => void;
  deactivateManualScan: () => void;
  isManualActivation?: boolean;
  resetInactivityTimer: () => void;
}

export function useCamera({
  isManualActivation = true,
}: UseCameraOptions = {}): UseCameraResult {
  const [permission, requestExpoPermission] = useCameraPermissions();
  const [isPaused, setIsPaused] = useState(false);
  const [isManuallyActive, setIsManuallyActive] = useState(false);
  const isFocused = useIsFocused();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityTimeout = 30000;

  function stopInactivityTimer(): void {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  const resetInactivityTimer = useCallback(function (): void {
    stopInactivityTimer();
    if (inactivityTimeout > 0) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(true);
      }, inactivityTimeout);
    }
  }, []);

  function reactivate(): void {
    if (isPaused) {
      setIsPaused(false);
      resetInactivityTimer();
    }
  }

  const requestPermission = useCallback(
    async function (): Promise<void> {
      const newPermission = await requestExpoPermission();

      if (!newPermission.granted) {
        if (!newPermission.canAskAgain) {
          Alert.alert(
            "Permissão Necessária",
            "Para escanear códigos, precisamos de acesso à câmera. Por favor, habilite a permissão nas configurações do aplicativo.",
            [
              { text: "Cancelar", style: "cancel" },
              {
                text: "Abrir Configurações",
                onPress: () => Linking.openSettings(),
              },
            ]
          );
        }
      }
    },
    [requestExpoPermission]
  );

  useEffect(
    function () {
      if (!permission?.granted) {
        requestPermission();
      }

      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "active" && !permission?.granted) {
            requestExpoPermission();
          }
        }
      );

      return function () {
        subscription.remove();
      };
    },
    [requestPermission, requestExpoPermission, permission?.granted]
  );

  let status: UseCameraResult["status"] = "LOADING";
  if (permission) {
    if (!isFocused) {
      status = "UNAVAILABLE";
    } else if (!permission.granted) {
      status = "NO_PERMISSION";
    } else {
      status = "READY";
    }
  }

  useEffect(
    function () {
      const shouldRunTimer = status === "READY" && !isPaused && isFocused;
      if (shouldRunTimer) {
        resetInactivityTimer();
      } else {
        stopInactivityTimer();
      }
      return stopInactivityTimer;
    },
    [status, isPaused, isFocused, resetInactivityTimer]
  );

  function activateManualScan(): void {
    if (isManualActivation) {
      setIsManuallyActive(true);
    }
  }

  function deactivateManualScan(): void {
    if (isManualActivation) {
      setIsManuallyActive(false);
    }
  }

  const isScanningActive =
    status === "READY" &&
    !isPaused &&
    (!isManualActivation || isManuallyActive);

  return {
    status,
    isPaused,
    permission,
    requestPermission,
    reactivate,
    isScanningActive,
    activateManualScan,
    deactivateManualScan,
    isManualActivation,
    resetInactivityTimer,
  };
}
