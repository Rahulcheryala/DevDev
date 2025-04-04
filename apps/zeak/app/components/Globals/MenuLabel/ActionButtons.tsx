import { RunnerIcon, MenuLabelPlugIcon, MenuLabelBellIcon, GlowIcon, PlusIcon } from "@zeak/icons";
import { Button } from "~/components/Common/Components";

export const ActionButtons = () => {
    const buttons = [
        { icon: RunnerIcon, alt: 'Runner' },
        { icon: MenuLabelPlugIcon, alt: 'Plug' },
        { icon: MenuLabelBellIcon, alt: 'Bell' },
        { icon: GlowIcon, alt: 'Glow' },
        { icon: PlusIcon, alt: 'Plus' },
    ]

    return (
        <>
            {buttons.map(({ icon: Icon, alt }) => (
                <Button key={alt} className="ghost" data-variant="ghost" data-size="icon">
                    <Icon />
                </Button>
            ))}
        </>
    )
} 