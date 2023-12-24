import notFoundSVG from '@/assets/not-fount.svg'

export function NotFound() {
  return (
    <section className="mt-16 flex flex-col items-center">
      <h1 className="text-2xl font-semibold">Página não encontrada!</h1>
      <img
        src={notFoundSVG}
        alt="Imagem de página não encontrada 2 homens trabalhando"
        className="h-min w-[400px] 2xl:w-[600px]"
      />
    </section>
  )
}
