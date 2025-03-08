import { useRive } from '@rive-app/react-canvas';

export default function Simple() {
    const { RiveComponent } = useRive({
        src: '/avisbtn.riv',
        stateMachines: 'SM',
        autoplay: true,
    });

    return <RiveComponent className=" w-[240px] lg:w-[280px] md:w-[300px] cursor-pointer" />;
}
