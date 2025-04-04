import { useNavigate } from '@remix-run/react'
import Image from '../../../Image';

type NameColumnProps = {
    name: string;
    columnSize: number;
    link: string;
}

const NameColumn: React.FC<NameColumnProps> = ({ name, columnSize, link }: NameColumnProps): JSX.Element => {
    const navigate = useNavigate()
    return <div className="flex items-center gap-4 px-3 cursor-pointer" onClick={() => navigate(link)}>
        <Image alt={name} className='h-10 w-10 min-h-10 min-w-10 rounded-full' />
        <div style={{ maxWidth: columnSize }} className="text-ellipsis text-nowrap overflow-hidden text-accent-primary">
            {name}
        </div>
    </div>
}

export default NameColumn;
