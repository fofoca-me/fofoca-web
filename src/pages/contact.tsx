/* eslint-disable linebreak-style */
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { MainHeader } from '@components/home/main-header';
import ContactService from 'service.ts/contact';
import type { FormDataContact } from '@lib/types/contact';

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormDataContact>();

  const { back } = useRouter();

  const onSubmit = async (data: FormDataContact) => {
    try {
      await ContactService.sendEmail(data);
      alert('Mensagem enviada com sucesso!');
      reset();
    } catch (error) {
      alert('Erro ao enviar a mensagem. Tente novamente mais tarde.');
    }
  };

  return (
    <div className='mx-auto w-full p-4 md:w-3/5 lg:w-2/5'>
      <MainHeader useActionButton title='Fale Conosco' action={back} />

      <form onSubmit={handleSubmit(onSubmit)} className='mt-10 space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium'>
            Nome
          </label>
          <input
            type='text'
            id='name'
            {...register('name', { required: true })}
            className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm'
          />
          {errors.name && <p className='text-red-500'>Nome é obrigatório.</p>}
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium'>
            E-mail
          </label>
          <input
            type='email'
            id='email'
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm'
          />
          {errors.email && (
            <p className='text-red-500'>Digite um e-mail válido.</p>
          )}
        </div>

        <div>
          <label htmlFor='subject' className='block text-sm font-medium'>
            Assunto
          </label>
          <input
            type='text'
            id='subject'
            {...register('subject', { required: true })}
            className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm'
          />
          {errors.subject && (
            <p className='text-red-500'>Assunto é obrigatório.</p>
          )}
        </div>

        <div>
          <label htmlFor='message' className='block text-sm font-medium'>
            Mensagem
          </label>
          <textarea
            id='message'
            rows={5}
            {...register('message', { required: true })}
            className='mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-black shadow-sm'
          />
          {errors.message && (
            <p className='text-red-500'>Mensagem é obrigatória.</p>
          )}
        </div>

        <button
          type='submit'
          className='w-full rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700'
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
