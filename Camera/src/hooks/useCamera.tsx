import { useIsFocused } from "@react-navigation/native";
import { PermissionResponse, useCameraPermissions } from "expo-camera";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking } from "react-native";

export type CameraState =
  | "LOADING"
  | "NO_PERMISSION"
  | "UNAVAILABLE"
  | "READY"
  | "PAUSED";

export interface UseCameraOptions {
  isManualActivation?: boolean;
}

export interface UseCameraResult {
  cameraState: CameraState;
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
  const inactivityTimeout = 30000;
  const [permission, requestExpoPermission] = useCameraPermissions();
  const [cameraState, setCameraState] = useState<CameraState>("LOADING");
  const [isManuallyActive, setIsManuallyActive] = useState(false);
  const isFocused = useIsFocused();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function stopInactivityTimer(): void {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  const resetInactivityTimer = useCallback(
    function (): void {
      stopInactivityTimer();
      if (inactivityTimeout > 0) {
        timeoutRef.current = setTimeout(() => {
          setCameraState("PAUSED");
        }, inactivityTimeout);
      }
    },
    [inactivityTimeout]
  );

  function reactivate(): void {
    if (cameraState === "PAUSED") {
      setCameraState("READY");
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
      if (!isFocused) {
        setCameraState("UNAVAILABLE");
        return;
      }

      if (!permission) {
        setCameraState("LOADING");
        return;
      }

      if (!permission.granted) {
        setCameraState("NO_PERMISSION");
        return;
      }

      if (cameraState !== "READY" && cameraState !== "PAUSED") {
        setCameraState("READY");
      }
    },
    [permission, isFocused, cameraState]
  );

  useEffect(
    function () {
      if (!permission?.granted) {
        requestPermission();
      }

      const subscription = AppState.addEventListener(
        "change",
        (nextAppState) => {
          if (nextAppState === "active") {
            requestExpoPermission();
          }
        }
      );

      return function () {
        subscription.remove();
        stopInactivityTimer();
      };
    },
    [requestPermission, requestExpoPermission, permission?.granted]
  );

  useEffect(
    function () {
      if (cameraState === "READY" && isFocused) {
        resetInactivityTimer();
      } else {
        stopInactivityTimer();
      }

      return stopInactivityTimer;
    },
    [cameraState, isFocused, resetInactivityTimer]
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
    cameraState === "READY" && (!isManualActivation || isManuallyActive);

  return {
    cameraState,
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
