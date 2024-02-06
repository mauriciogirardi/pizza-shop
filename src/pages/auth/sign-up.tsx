import { useMutation } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerRestaurant } from '@/api/register-restaurant'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PATH_SIGN_IN } from '@/constants/paths'

const signUpForm = z.object({
  restaurantName: z.string(),
  managerName: z.string(),
  phone: z.string(),
  email: z.string().email(),
})

type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpForm>()

  const { mutateAsync: registerRestaurantFn } = useMutation({
    mutationFn: registerRestaurant,
  })

  async function handleSignUp({
    email,
    managerName,
    phone,
    restaurantName,
  }: SignUpForm) {
    try {
      await registerRestaurantFn({
        email,
        managerName,
        phone,
        restaurantName,
      })

      toast.success('Restaurante cadastrado com sucesso!', {
        action: {
          label: 'Login',
          onClick: () => navigate(`${PATH_SIGN_IN}?email=${email}`),
        },
      })
    } catch (error) {
      console.error(error)
      toast.error('Credenciais invalidas.')
    }
  }

  return (
    <>
      <Helmet title="Sign Up" />
      <div className="p-8">
        <Button
          asChild
          aria-label="Voltar para tela de login"
          className="absolute right-8 top-8"
          variant="ghost"
        >
          <Link to={PATH_SIGN_IN} className="flex items-center gap-3">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
            Fazer Login
          </Link>
        </Button>

        <div className="gpa-6 flex w-[350px] flex-col justify-center">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <span className="text-sm text-muted-foreground">
              Seja um parceiro e comece suas vendas!
            </span>
          </div>

          <form
            role="form"
            onSubmit={handleSubmit(handleSignUp)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                {...register('restaurantName')}
                aria-required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                {...register('managerName')}
                aria-required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                aria-required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                aria-required
              />
            </div>

            <Button
              className="w-full"
              type="submit"
              loading={isSubmitting}
              aria-label="Finalizar cadastro"
            >
              Finalizar cadastro
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
              Ao continuar, você concorda com nossos{' '}
              <a href="" className="underline underline-offset-4">
                Termos de serviço
              </a>{' '}
              e{' '}
              <a href="" className="underline underline-offset-4">
                políticas de privacidade
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
