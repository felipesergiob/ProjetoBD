import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/lib/axios'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

const signInFormSchema = z.object({
  email: z.string().email().min(1, {
    message: 'Email é obrigatório.'
  }),
  password: z.string().min(1, {
    message: 'Senha é obrigatório.'
  })
})

type FormInput = z.infer<typeof signInFormSchema>

export function Login() {
  const navigate = useNavigate()
  const form = useForm<FormInput>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { signIn } = useAuth()

  async function onSubmit(values: FormInput) {
    try {
      const { data } = await api.post('/users/sessions', {
        email: values.email,
        password: values.password
      })

      toast.success('Login realizado com sucesso.')

      signIn({
        userId: data.id,
        role: data.role
      })

      navigate('/')
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        toast.error('Ocorreu um erro.', {
          description: error.response?.data
        })
      }
    }
  }

  return (
    <div className="w-screen h-screen grid place-items-center">
      <div className="flex flex-col gap-6 max-w-sm mx-auto w-full border border-border p-4 rounded-lg">
        <h1 className="text-center">Entre agora</h1>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full">Entrar</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
