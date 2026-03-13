/**
 * ブラウザから現在位置（緯度・経度）を取得する
 */
const getCurrentLocation = (onError?: (msg: string) => void): Promise<{ latitude: number; longitude: number } | null> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      onError?.("お使いのブラウザは位置情報に対応していません。");
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let message = "位置情報の取得に失敗しました。";
        if (error.code === error.PERMISSION_DENIED) {
          message = "位置情報へのアクセスが拒否されました。";
        } else if (error.code === error.TIMEOUT) {
          message = "位置情報の取得がタイムアウトしました。";
        }
        onError?.(message);
        resolve(null);
      },
      { enableHighAccuracy: false, maximumAge: 60000 }
    );
  });
};

export default getCurrentLocation;
