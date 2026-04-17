import { SVGAttributes } from 'react';
import logo from "@/assets/logo.jpg"


export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <img src={logo} />
    );
}
