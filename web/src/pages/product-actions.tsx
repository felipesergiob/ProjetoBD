import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { z } from 'zod'
import { useCategories } from '@/hooks/use-categories'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useEffect } from 'react'
import { api } from '@/lib/axios'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { queryClient } from '@/lib/query-client'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  description: z.string().min(1, { message: 'Descrição é obrigatório' }),
  price: z.coerce
    .number({ required_error: 'Preço é obrigatório' })
    .min(1, { message: 'Preço é obrigatório' }),
  categoryId: z.string().min(1, { message: 'Categoria é obrigatória' }),
  images: z.string().min(1, { message: 'Imagens são obrigatórias' }),
  colors: z.string()
})

type FormInput = z.infer<typeof formSchema>

export function ProductActions() {
  const [searchParams] = useSearchParams()
  const form = useForm<FormInput>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: '',
      description: '',
      name: '',
      price: 0
    }
  })
  const { data: categories } = useCategories()

  const productId = searchParams.get('productId')

  useEffect(() => {
    if (productId) {
      api.get(`/products/${productId}`).then(response => {
        form.setValue('name', response.data.name)
        form.setValue('description', response.data.description)
        form.setValue('price', response.data.price)
        form.setValue('categoryId', String(response.data.categoryId))
        form.setValue('images', response.data.images.join(', '))
        form.setValue('colors', response.data.images.join(', '))
      })
    }
  }, [form, productId])

  const title = productId ? 'Editar ' + form.getValues().name : 'Criar Produto'

  console.log(form.watch())

  async function onSubmit(values: FormInput) {
    const formattedValues = {
      ...values,
      categoryId: Number(values.categoryId),
      images: values.images.split(', '),
      colors: values.colors.split(', ')
    }

    try {
      if (!productId) {
        await api.post('/products', {
          ...formattedValues
        })

        toast.success('Produto criado com sucesso')
      } else {
        console.log('oi')
        await api.put(`/products/${productId}`, {
          ...formattedValues
        })
        toast.success('Produto atualizado com sucesso')
      }

      queryClient.invalidateQueries({
        queryKey: ['products']
      })
    } catch (error) {
      toast.error('Ocorre um erro.')
    }
  }

  if (!categories) {
    return <p>Carregando...</p>
  }

  return (
    <div className="mx-auto max-w-4xl my-8 px-4 w-full flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-medium">{title}</h1>
        {productId && 'Não é possível editar as imagens e cores'}
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!productId && (
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Imagens</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    As imagens devem ser separadas por uma vírgula:
                    https://imagem1, https://imagem2
                  </FormDescription>
                </FormItem>
              )}
            />
          )}
          {!productId && (
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cores</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    As cores devem ser separadas por uma vírgula: Branco,
                    Vermelho
                  </FormDescription>
                </FormItem>
              )}
            />
          )}

          <Button type="submit">Salvar</Button>
        </form>
      </Form>
    </div>
  )
}
