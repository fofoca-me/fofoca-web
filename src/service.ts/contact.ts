/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import api from '@lib/api';
import type { FormDataContact } from '@lib/types/contact';

interface SendEmailResponse {
  message: string;
  error?: string;
}

const ContactService = {
  sendEmail: async (data: FormDataContact): Promise<SendEmailResponse> => {
    return (await api.post('/api/contact', data)).data;
  }
};

export default ContactService;
