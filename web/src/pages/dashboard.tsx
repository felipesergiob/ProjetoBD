import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useProducts } from '@/hooks/use-products'
import { useStats } from '@/hooks/use-stats'
import { formatMoney } from '@/utils/format'
import { Pen, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend
} from 'recharts'

function formatDateToMonthYear(dateString: string) {
  const date = new Date(dateString)

  const text = date.toLocaleDateString('pt-BR', {
    month: 'short',
    year: 'numeric'
  })

  return text.slice(0, 1).toUpperCase() + text.slice(1)
}

export function Dashboard() {
  const { data: products } = useProducts()
  const { data: stats } = useStats()

  if (!stats) {
    return <p>Carregando...</p>
  }

  const monthlyStats = stats.monthly.map(stat => ({
    name: formatDateToMonthYear(stat.month),
    Total: stat.total
  }))

  return (
    <div className="max-w-6xl mx-auto px-4 my-8 flex flex-col gap-24">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-3xl">Dashboard</h2>

          <Button asChild>
            <Link to="/product-actions">Novo Produto</Link>
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="p-3 border border-border rounded-md flex flex-col gap-4">
            <h3 className="">Total de produtos</h3>

            <strong className="text-xl">{stats.main.totalProdutos}</strong>
          </div>
          <div className="p-3 border border-border rounded-md flex flex-col gap-4">
            <h3 className="">Pedidos realizados</h3>

            <strong className="text-xl">{stats.main.totalPedidos}</strong>
          </div>
          <div className="p-3 border border-border rounded-md flex flex-col gap-4">
            <h3 className="">Lucro Total</h3>

            <strong className="text-xl">{formatMoney(stats.main.lucro)}</strong>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart height={400} data={monthlyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis />
            <XAxis dataKey="name" />
            <Tooltip />
            <Legend />

            <Bar barSize={18} dataKey="Total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-semibold">Produtos</h3>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{formatMoney(product.price)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1 items-center">
                      <Button variant="outline">
                        <Trash className="w-4 h-4" />
                      </Button>
                      <Button asChild variant="outline">
                        <Link to={`/product-actions?productId=${product.id}`}>
                          <Pen className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
