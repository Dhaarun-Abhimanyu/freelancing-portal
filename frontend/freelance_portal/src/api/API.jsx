import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  timeout: 30000,
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('401 Unauthorized:', error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export const userAPI = {
  signup: (credentials) => API.post('/api/auth/register', credentials),
  login: (credentials) => API.post('/api/auth/login', credentials),
  logout: () => API.post('/api/auth/logout'),
  status: () => API.get('/api/auth/status'),
  verifySecurityCode: (payload) => API.post('/api/auth/verify-security-code', payload),
  requestResetCode: (payload) => API.post('/api/auth/generate-security-code', payload),
  resetPassword: (payload) => API.post('/api/auth/reset-password', payload),
  refreshAccessToken: () => API.post('/api/auth/refresh-token'),
};

export const employerAPI = {
  proposeJob: (jobDetails) => API.post('/api/employer/propose-job', jobDetails),
  fetchFreelancers: (employerId) => API.get('/api/employer/freelancers', { params: { employer_id: employerId } }),
  acceptFreelancer: (contractDetails) => API.post('/api/employer/accept-freelancer', contractDetails),
  receiveUpdates: (updateDetails) => API.post('/api/employer/receive-updates', updateDetails),
  messageFreelancer: (messageDetails) => API.post('/api/employer/message-freelancer', messageDetails),
};

export const freelancerAPI = {
  applyProposal: (proposalDetails) => API.post('/api/freelancer/apply-proposal', proposalDetails),
  acceptContract: (contractDetails) => API.post('/api/freelancer/accept-contract', contractDetails),
  sendUpdates: (updateDetails) => API.post('/api/freelancer/send-updates', updateDetails),
  messageEmployer: (messageDetails) => API.post('/api/freelancer/message-employer', messageDetails),
};

export default API;