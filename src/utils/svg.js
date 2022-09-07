import { NavIcon, SvgLogo } from "../components/Header";

export function Logo() {
    return (
        <SvgLogo to={"/"} className={`${({ isActive }) => isActive && "active"} Logo`}>
            <svg
                className='ADD'
                width="563.77"
                height="63.75"
                data-name="Layer 1"
                viewBox="0 0 563.77 63.75"
            >
                <path vectorEffect='non-scaling-stroke' d="M24.48 51.04c-.24-.43-.46-.95-.68-1.57-.21-.62-.39-1.43-.54-2.43h-.14c-1.24 1.67-2.78 2.9-4.64 3.71s-3.97 1.21-6.35 1.21c-1.76 0-3.38-.24-4.85-.71-1.48-.47-2.75-1.17-3.82-2.07S1.54 47.14.93 45.79C.31 44.43 0 42.85 0 41.04c0-2 .36-3.68 1.07-5.03a9.287 9.287 0 012.89-3.32c1.21-.86 2.62-1.5 4.21-1.93s3.27-.74 5.03-.93c1.9-.19 3.49-.4 4.75-.64 1.26-.24 2.27-.52 3.03-.86.76-.33 1.29-.7 1.57-1.11.29-.4.43-.89.43-1.46 0-1-.27-1.83-.82-2.5s-1.56-1-3.03-1c-1.48 0-2.59.39-3.35 1.18-.76.79-1.24 1.84-1.43 3.18H1.57c.05-1.81.44-3.51 1.18-5.1S4.57 18.53 6 17.34s3.21-2.13 5.35-2.82 4.64-1.04 7.5-1.04c2.81 0 5.15.19 7.03.57s3.51 1 4.89 1.86c3.76 2.33 5.64 5.97 5.64 10.92v18.2c0 1.52.08 2.71.25 3.57.17.86.54 1.48 1.11 1.86v.57H24.48v.01zm-7.28-7.06c1.57 0 2.99-.48 4.25-1.43 1.26-.95 1.89-2.52 1.89-4.71v-3.21c-.67.33-1.42.64-2.25.93-.83.29-1.82.55-2.96.79-2 .43-3.35.95-4.07 1.57-.71.62-1.07 1.48-1.07 2.57 0 1.24.43 2.13 1.28 2.68.86.53 1.84.81 2.93.81zM39.62 14.64h4.5v-2c0-4.14 1.05-7.21 3.14-9.21.86-.81 1.93-1.45 3.21-1.93 1.29-.48 2.7-.82 4.25-1.04C56.27.25 57.9.14 59.61.14s3.43.1 5.14.29v8.92c-1.05 0-2.01.01-2.89.04-.88.02-1.63.18-2.25.46-.62.29-1.11.73-1.46 1.32-.36.6-.54 1.44-.54 2.53v.93h7.14v8.14h-7.14v28.27H44.12V22.77h-4.5v-8.13zM66.24 14.64h4.71V2.86h13.21v11.78h6.92v8.14h-6.92v14.78c0 .9.15 1.61.46 2.11.31.5.76.86 1.36 1.07.59.21 1.31.33 2.14.36.83.02 1.77-.01 2.82-.11v9.92c-1.05.24-2.11.44-3.18.61-1.07.17-2.23.25-3.46.25-2.24 0-4.19-.18-5.85-.54-1.67-.36-3.05-.96-4.14-1.82-1.1-.86-1.93-2-2.5-3.43s-.86-3.24-.86-5.42V22.79h-4.71v-8.15zM113 52.04c-3 0-5.71-.48-8.14-1.43-2.43-.95-4.52-2.28-6.28-4-1.76-1.71-3.12-3.75-4.07-6.1-.95-2.36-1.43-4.94-1.43-7.74 0-2.76.48-5.32 1.43-7.67.95-2.36 2.28-4.4 4-6.14s3.76-3.09 6.14-4.07c2.38-.97 5-1.46 7.85-1.46s5.39.44 7.6 1.32 4.15 2.08 5.82 3.6c2.24 2.05 3.88 4.62 4.93 7.71 1.05 3.09 1.52 6.45 1.43 10.06H106.3c.38 2.14 1.15 3.81 2.32 5s2.77 1.78 4.82 1.78c2.38 0 4.07-.9 5.07-2.71h13.06c-.38 1.67-1.18 3.26-2.39 4.78s-2.73 2.86-4.53 4c-1.67 1.1-3.44 1.88-5.32 2.36-1.9.47-4 .71-6.33.71zm-.22-29.55c-1.86 0-3.31.58-4.35 1.75-1.05 1.17-1.76 2.75-2.14 4.75h12.56c-.29-2.05-.96-3.64-2.03-4.78-1.08-1.15-2.42-1.72-4.04-1.72zM148.47 20.14h.21c1.47-2.28 3.11-3.9 4.89-4.85s3.84-1.43 6.17-1.43c1 0 1.74.12 2.21.36v11.49h-.29c-4-.67-7.09-.13-9.28 1.61s-3.28 4.68-3.28 8.82v14.92h-13.48V14.65h12.85v5.49zM179.74 52.26c-2.38 0-4.57-.43-6.57-1.29-2-.86-3.72-2.11-5.18-3.75-1.45-1.64-2.59-3.68-3.43-6.1-.83-2.43-1.25-5.21-1.25-8.35 0-2.86.39-5.46 1.18-7.82s1.89-4.39 3.32-6.1 3.14-3.03 5.14-3.96 4.21-1.39 6.64-1.39c2.62 0 4.66.45 6.14 1.36 1.47.9 2.81 2.12 4 3.64h.21V.01h13.49v51.04h-12.85v-5.07h-.14c-1.19 2.05-2.7 3.61-4.53 4.68-1.83 1.06-3.89 1.6-6.17 1.6zm3.85-10.21c1 0 1.92-.25 2.75-.75s1.54-1.18 2.11-2.03 1.02-1.86 1.36-3c.33-1.14.5-2.38.5-3.71 0-1.28-.17-2.5-.5-3.64s-.79-2.14-1.36-3a6.19 6.19 0 00-2.11-2c-.83-.48-1.75-.71-2.75-.71-2 0-3.59.86-4.78 2.57-1.19 1.71-1.78 3.97-1.78 6.78s.59 5.09 1.78 6.85c1.19 1.76 2.78 2.64 4.78 2.64zM231.13 51.04c-.24-.43-.46-.95-.68-1.57-.21-.62-.39-1.43-.54-2.43h-.14c-1.24 1.67-2.78 2.9-4.64 3.71-1.86.81-3.97 1.21-6.35 1.21-1.76 0-3.38-.24-4.85-.71-1.48-.47-2.75-1.17-3.82-2.07s-1.92-2.04-2.53-3.39c-.62-1.36-.93-2.94-.93-4.75 0-2 .36-3.68 1.07-5.03a9.287 9.287 0 012.89-3.32c1.21-.86 2.62-1.5 4.21-1.93s3.27-.74 5.03-.93c1.9-.19 3.49-.4 4.75-.64 1.26-.24 2.27-.52 3.03-.86.76-.33 1.29-.7 1.57-1.11.29-.4.43-.89.43-1.46 0-1-.27-1.83-.82-2.5-.55-.67-1.56-1-3.03-1-1.48 0-2.59.39-3.36 1.18-.76.79-1.24 1.84-1.43 3.18h-12.77c.05-1.81.44-3.51 1.18-5.1s1.82-2.99 3.25-4.18 3.21-2.13 5.35-2.82 4.64-1.04 7.5-1.04c2.81 0 5.15.19 7.03.57s3.51 1 4.89 1.86c3.76 2.33 5.64 5.97 5.64 10.92v18.2c0 1.52.08 2.71.25 3.57s.54 1.48 1.11 1.86v.57h-13.29v.01zm-7.28-7.06c1.57 0 2.99-.48 4.25-1.43 1.26-.95 1.89-2.52 1.89-4.71v-3.21c-.67.33-1.42.64-2.25.93-.83.29-1.82.55-2.96.79-2 .43-3.35.95-4.07 1.57-.71.62-1.07 1.48-1.07 2.57 0 1.24.43 2.13 1.29 2.68.85.53 1.83.81 2.92.81zM261.04 20.14h.21c1.47-2.28 3.1-3.9 4.89-4.85 1.78-.95 3.84-1.43 6.17-1.43 1 0 1.74.12 2.21.36v11.49h-.29c-4-.67-7.09-.13-9.28 1.61s-3.28 4.68-3.28 8.82v14.92h-13.49V14.65h12.85v5.49h.01zM293.81 37.98l-2.78 3.07v9.99h-13.28V0h13.28v25.48l8.78-10.85h15.13l-12.13 13.42 13.56 22.99h-15.28l-7.28-13.06z"></path>
                <path vectorEffect='non-scaling-stroke' d="M330.78 52.26c-2.38 0-4.57-.43-6.57-1.29-2-.86-3.72-2.11-5.17-3.75s-2.59-3.68-3.43-6.1c-.83-2.43-1.25-5.21-1.25-8.35 0-2.86.39-5.46 1.18-7.82s1.89-4.39 3.32-6.1 3.14-3.03 5.14-3.96 4.21-1.39 6.64-1.39c2.62 0 4.66.45 6.14 1.36 1.47.9 2.81 2.12 4 3.64h.21V.01h13.49v51.04h-12.85v-5.07h-.14c-1.19 2.05-2.7 3.61-4.53 4.68-1.84 1.06-3.9 1.6-6.18 1.6zm3.85-10.21c1 0 1.92-.25 2.75-.75s1.54-1.18 2.11-2.03 1.02-1.86 1.36-3c.33-1.14.5-2.38.5-3.71 0-1.28-.17-2.5-.5-3.64s-.79-2.14-1.36-3a6.19 6.19 0 00-2.11-2c-.83-.48-1.75-.71-2.75-.71-2 0-3.59.86-4.78 2.57-1.19 1.71-1.78 3.97-1.78 6.78s.59 5.09 1.78 6.85c1.19 1.76 2.79 2.64 4.78 2.64zM359.33.01h13.49v10.21h-13.49V.01zm0 14.63h13.49v36.41h-13.49V14.64zM395.52 63.75c-5.14 0-9.36-1-12.67-3-3.31-2-5.29-5.02-5.96-9.07h12.99c.24.76.8 1.46 1.68 2.11.88.64 2.13.96 3.75.96 2.19 0 3.71-.58 4.57-1.75.86-1.17 1.29-2.7 1.29-4.6v-3.28h-.29c-1.09 1.24-2.37 2.24-3.82 3s-3.25 1.14-5.39 1.14c-2.09 0-4.07-.36-5.92-1.07s-3.5-1.8-4.93-3.25-2.56-3.25-3.39-5.39c-.83-2.14-1.25-4.64-1.25-7.5 0-2.62.36-5.06 1.07-7.32.71-2.26 1.71-4.22 3-5.89 1.28-1.67 2.84-2.97 4.67-3.93 1.83-.95 3.87-1.43 6.1-1.43 2.57 0 4.68.46 6.32 1.39s2.99 2.18 4.03 3.75h.21v-4h12.85v32.05c0 2.95-.49 5.52-1.46 7.71-.98 2.19-2.27 3.97-3.89 5.35-1.67 1.43-3.67 2.45-6 3.07-2.32.64-4.84.95-7.56.95zm0-23.91c2 0 3.53-.79 4.6-2.36 1.07-1.57 1.61-3.57 1.61-6 0-2.28-.54-4.22-1.61-5.82-1.07-1.59-2.61-2.39-4.6-2.39-1.9 0-3.42.75-4.53 2.25-1.12 1.5-1.68 3.49-1.68 5.96 0 2.43.56 4.43 1.68 6 1.12 1.57 2.63 2.36 4.53 2.36zM419.29.01h13.49v10.21h-13.49V.01zm0 14.63h13.49v36.41h-13.49V14.64zM435 14.64h4.71V2.86h13.21v11.78h6.92v8.14h-6.92v14.78c0 .9.15 1.61.46 2.11s.76.86 1.36 1.07c.59.21 1.31.33 2.14.36.83.02 1.77-.01 2.82-.11v9.92c-1.05.24-2.11.44-3.18.61-1.07.17-2.23.25-3.46.25-2.24 0-4.19-.18-5.85-.54-1.67-.36-3.05-.96-4.14-1.82s-1.93-2-2.5-3.43-.86-3.24-.86-5.42V22.79H435v-8.15zM486.89 51.04c-.24-.43-.46-.95-.68-1.57-.21-.62-.39-1.43-.54-2.43h-.14c-1.24 1.67-2.78 2.9-4.64 3.71s-3.97 1.21-6.35 1.21c-1.76 0-3.38-.24-4.85-.71-1.48-.47-2.75-1.17-3.82-2.07s-1.92-2.04-2.53-3.39c-.62-1.36-.93-2.94-.93-4.75 0-2 .36-3.68 1.07-5.03a9.287 9.287 0 012.89-3.32c1.21-.86 2.62-1.5 4.21-1.93s3.27-.74 5.03-.93c1.9-.19 3.49-.4 4.75-.64 1.26-.24 2.27-.52 3.03-.86.76-.33 1.29-.7 1.57-1.11.29-.4.43-.89.43-1.46 0-1-.27-1.83-.82-2.5s-1.56-1-3.03-1c-1.48 0-2.59.39-3.36 1.18-.76.79-1.24 1.84-1.43 3.18h-12.78c.05-1.81.44-3.51 1.18-5.1s1.82-2.99 3.25-4.18 3.21-2.13 5.35-2.82c2.14-.69 4.64-1.04 7.5-1.04 2.81 0 5.15.19 7.03.57s3.51 1 4.89 1.86c3.76 2.33 5.64 5.97 5.64 10.92v18.2c0 1.52.08 2.71.25 3.57s.54 1.48 1.11 1.86v.57h-13.28v.01zm-7.28-7.06c1.57 0 2.99-.48 4.25-1.43 1.26-.95 1.89-2.52 1.89-4.71v-3.21c-.67.33-1.42.64-2.25.93-.83.29-1.82.55-2.96.79-2 .43-3.35.95-4.07 1.57-.71.62-1.07 1.48-1.07 2.57 0 1.24.43 2.13 1.29 2.68.85.53 1.82.81 2.92.81zM503.95.01h13.85v51.04h-13.85V.01zM518.87.01h17.63v5.78h-5.28v13.63h-7.07V5.79h-5.28V.01zm20.2 0h9.57l2.64 9.57h.14l2.64-9.57h9.71v19.42h-6.57V8.72h-.14l-3.36 10.71h-4.85l-3.28-10.71h-.14v10.71h-6.35V.01h-.01z"></path>
            </svg>
        </SvgLogo >
    );
}
export function HamburgerIcon() {
    return (
        <NavIcon
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 284.484 224.004"
        >
            <path vectorEffect='non-scaling-stroke' d="M5.602 0h273.28c3.093 0 5.601 3.094 5.601 5.602v28a5.602 5.602 0 01-5.602 5.602H5.602C2.508 39.204 0 36.11 0 33.602v-28A5.602 5.602 0 015.602 0zM5.602 92.4h273.28c3.094 0 5.602 3.094 5.602 5.602v28a5.602 5.602 0 01-5.602 5.602H5.602c-3.094 0-5.602-3.094-5.602-5.602v-28A5.602 5.602 0 015.602 92.4zM5.602 184.8h273.28c3.094 0 5.602 3.094 5.602 5.602v28a5.602 5.602 0 01-5.602 5.602H5.602c-3.094 0-5.602-3.094-5.602-5.602v-28a5.602 5.602 0 015.602-5.602z"></path>
        </NavIcon>
    );
}
export function EmailIcon() {
    return (
        <NavIcon
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 505.465 226.314"
        >
            <path vectorEffect='non-scaling-stroke' d="M505.418 7.832c0-.02-.008-.039-.008-.059a8.356 8.356 0 00-.242-1.273c-.012-.035-.012-.07-.02-.109-.012-.039-.016-.039-.023-.059a9.063 9.063 0 00-.453-1.215c-.031-.066-.062-.125-.094-.188h.004a8.672 8.672 0 00-.633-1.109c-.02-.031-.043-.055-.066-.086a8.954 8.954 0 00-.746-.918c-.051-.051-.094-.109-.145-.16v.004a8.896 8.896 0 00-.902-.809c-.062-.051-.129-.098-.191-.145a8.752 8.752 0 00-1.055-.672c-.016-.012-.035-.016-.051-.023v-.004a8.818 8.818 0 00-1.144-.492c-.059-.02-.109-.043-.168-.062a8.775 8.775 0 00-1.219-.309c-.078-.016-.156-.023-.234-.035A8.72 8.72 0 00496.716 0H139.995c-.43.004-.859.039-1.289.109-.082.012-.16.023-.238.039V.144c-.41.074-.812.176-1.211.301-.051.016-.102.039-.152.059-.379.133-.75.289-1.105.477-.031.016-.062.027-.094.043h-.004a9.303 9.303 0 00-2.144 1.602c-.039.039-.07.082-.109.121-.262.277-.508.57-.73.879-.035.051-.074.098-.109.148-.234.34-.445.699-.629 1.07l-.094.195a8.396 8.396 0 00-.469 1.211l-.008.023c-.008.023-.008.043-.016.066a8.54 8.54 0 00-.254 1.211c-.008.062-.023.125-.031.188h.004c-.043.34-.062.676-.066 1.016v208.81c0 2.32.922 4.543 2.566 6.184a8.728 8.728 0 006.184 2.566h356.718c2.32 0 4.547-.922 6.188-2.566a8.741 8.741 0 002.562-6.184V8.764a8.21 8.21 0 00-.051-.926l.004-.006zm-39.945 9.672l-152.65 92.785-143.22-92.781 295.87-.004zm-316.73 191.31V24.844l159.17 103.11a8.75 8.75 0 009.297.133l170.75-103.78.004 184.51-339.221-.003zM0 .012h98.434v17.5H0V.012zM23.848 47.542h74.586v17.5H23.848v-17.5zM41.348 95.062h57.086v17.5H41.348v-17.5z"></path>
        </NavIcon>
    );
}