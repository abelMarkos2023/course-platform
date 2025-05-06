import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { formatPlural, formatPrice } from '@/lib/fotmatter'
import { Button } from '../ui/button'
import { EditIcon, EyeClosedIcon, EyeIcon, Trash2Icon } from 'lucide-react'
import Link from 'next/link'
import ActionButton from '../ActionButton'
import { deleteCourseAction } from '@/features/Course/action/course.action'
import { ProductStatus } from '@/drizzle/schema/product'
import Image from 'next/image'
import { Badge } from '../ui/badge'

const ProductsTable = ({products}:{
    products:{ id: string; name: string;
             imageUrl:string,status:ProductStatus ;
             description:string,customersCount:number,
             priceInDollars:number,coursesCount:number 
            }[]
        }) => {
return (
<Table>
    <TableHeader>
        <TableRow>
            <TableHead>{formatPlural(products.length,'Product','Products')}</TableHead>
            <TableHead>Customers</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Actions</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {
            products.map((product) => (
                <TableRow key={product.id}>
                    <TableCell className="font-medium">
                       <div className="flex items-center gap-4">
                        <Image 
                        className='object-cover rounded-md size-12'
                          src={product.imageUrl}
                          width={192}
                          height={192}
                          alt={product.name}
                        />
                        <div className="flex flex-col gap-1">
                            <p className="font-semibold">{product.name}</p>
                            <p className="text-muted-foreground">
                                {
                                formatPlural(product.coursesCount,'Course','Courses')} . {formatPrice(product.priceInDollars)
                                }
                            </p>
                        </div>
                       </div>
                    </TableCell>
                    <TableCell>{product.customersCount}</TableCell>
                    <TableCell>
                        <Badge className='inline-flex items-center'>
                           { getIconStatus(product.status)} {product.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <div className="flex flex-row gap-1">
                            <Button className='flex items-center gap-1' asChild>
                                <Link href={`/admin/products/${product.id}/edit`}>
                                    <EditIcon className='w-4 h-4' />
                                    Edit                                       
                                </Link>
                            </Button>
                            <ActionButton className='cursor-pointer' variant={'destructive'} action={deleteCourseAction.bind(null,product.id)} requireAreYouSure>
                                <Trash2Icon className='w-4 h-4' />
                                <span className='sr-only'>Delete</span>
                            </ActionButton>
                        </div>
                    </TableCell>
                </TableRow>
            ))
        }
    </TableBody>
</Table>
)
}

function getIconStatus(status:ProductStatus){
    const Icon = {
        public:EyeIcon,
        private:EyeClosedIcon
    }[status]

    return <Icon  className='size-4'/>
    }


export default ProductsTable