import { BLABBER_BASE_URL, VERSION, SIGN_UP, USER, CHAT, LOGIN } from "./Constants";
import axios from 'axios'


export async function loginOperation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = BLABBER_BASE_URL + VERSION + USER + LOGIN;
      const CONFIG = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(URL, payload, CONFIG);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

export async function SignUpOperation(payload) {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = BLABBER_BASE_URL + VERSION + USER + SIGN_UP;
      const CONFIG = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await axios.post(URL, payload, CONFIG);
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
}

