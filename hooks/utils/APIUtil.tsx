const MOCK_API_URI_REL = "/api/"; // モック環境
const MOCK_API_URI = "http://localhost:3000/api/"; // モック環境
const DEV_API_URI = "http://localhost:8000/"; // 開発環境
const PROD_API_URI = "https://excuse-by-pollen-back.onrender.com/"; // 本番環境

/**
 * 通常時は本番環境でのAPIを利用し、開発時は開発環境のAPIを使う
 * また、バックエンドがローカルで起動していない場合、モック環境をフォールバックとする
 */
const fetchApi = async (path: string, init: RequestInit): Promise<Response> => {
  if (process.env.NODE_ENV !== "development")
    return await fetch(PROD_API_URI + path, init);

  try {
    return await fetch(DEV_API_URI + path, init);
  } catch {
    try {    
      return await fetch(MOCK_API_URI + path, init);
    } catch {
      return await fetch(MOCK_API_URI_REL + path, init);
    }
  }
};

export default fetchApi;
