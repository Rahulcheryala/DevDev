export type Option = {
    id: string
    value: string
    label: string
    isPrimary?: boolean
}

export type MultiSelectInputProps = {
    label?: string
    placeholder?: string
    options: Option[]
    defaultValue?: Option[]
    defaultOpen?: boolean
    // onChange?: (selected: Option[]) => void
    onChange?: any
    className?: string
}