import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

export const MenuIcons = {
    Homeboard: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M14 13H16.7508V18.78H23.2492V13H26V27H23.2492V21.18H16.7508V27H14V13Z" fill="#475467" />
        </svg>
    ),
    HomeboardHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M14 13H16.7508V18.78H23.2492V13H26V27H23.2492V21.18H16.7508V27H14V13Z" fill="url(#paint0_linear_13917_107200)" />
            <defs>
                <linearGradient id="paint0_linear_13917_107200" x1="20" y1="13" x2="20" y2="27" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#64FFA2" />
                    <stop offset="1" stopColor="#0051FF" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Tasks: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M18.5773 15.4H14V13H26V15.4H21.4227V27H18.5773V15.4Z" fill="#475467" />
        </svg>
    ),
    TasksHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M18.5773 15.4H14V13H26V15.4H21.4227V27H18.5773V15.4Z" fill="url(#paint0_linear_13917_108181)" />
            <defs>
                <linearGradient id="paint0_linear_13917_108181" x1="14" y1="13" x2="26.1154" y2="28.5769" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFDF41" />
                    <stop offset="1" stopColor="#D3B312" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Favorites: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M15 13H25V15.4H17.6336V19.16H24.2939V21.56H17.6336V27H15V13Z" fill="#475467" />
        </svg>
    ),
    FavoritesHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M15 13H25V15.4H17.6336V19.16H24.2939V21.56H17.6336V27H15V13Z" fill="url(#paint0_linear_14422_5534)" />
            <defs>
                <linearGradient id="paint0_linear_14422_5534" x1="15" y1="13" x2="25.1426" y2="26.552" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#C93400" />
                    <stop offset="1" stopColor="#FF003C" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Recent: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M14 13H21.4899C22.7114 13 23.6913 13.3267 24.4295 13.98C25.1812 14.6333 25.557 15.4933 25.557 16.56V17.96C25.557 18.6533 25.3557 19.26 24.953 19.78C24.5638 20.2867 23.9933 20.6733 23.2416 20.94V20.98C23.6711 21.26 23.9933 21.58 24.2081 21.94C24.4362 22.3 24.6577 22.8 24.8725 23.44L26 27H23.1208L22.0537 23.68C21.8792 23.1067 21.6376 22.68 21.3289 22.4C21.0201 22.12 20.6376 21.98 20.1812 21.98H16.7785V27H14V13ZM20.9664 19.6C21.5302 19.6 21.9732 19.4533 22.2953 19.16C22.6174 18.8533 22.7785 18.46 22.7785 17.98V16.68C22.7785 16.2933 22.6577 15.9867 22.4161 15.76C22.1745 15.52 21.8523 15.4 21.4497 15.4H16.7785V19.6H20.9664Z" fill="#475467" />
        </svg>
    ),
    RecentHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M14 13H21.4899C22.7114 13 23.6913 13.3267 24.4295 13.98C25.1812 14.6333 25.557 15.4933 25.557 16.56V17.96C25.557 18.6533 25.3557 19.26 24.953 19.78C24.5638 20.2867 23.9933 20.6733 23.2416 20.94V20.98C23.6711 21.26 23.9933 21.58 24.2081 21.94C24.4362 22.3 24.6577 22.8 24.8725 23.44L26 27H23.1208L22.0537 23.68C21.8792 23.1067 21.6376 22.68 21.3289 22.4C21.0201 22.12 20.6376 21.98 20.1812 21.98H16.7785V27H14V13ZM20.9664 19.6C21.5302 19.6 21.9732 19.4533 22.2953 19.16C22.6174 18.8533 22.7785 18.46 22.7785 17.98V16.68C22.7785 16.2933 22.6577 15.9867 22.4161 15.76C22.1745 15.52 21.8523 15.4 21.4497 15.4H16.7785V19.6H20.9664Z" fill="url(#paint0_linear_13917_108218)" />
            <defs>
                <linearGradient id="paint0_linear_13917_108218" x1="20" y1="13" x2="20" y2="27" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#07B865" />
                    <stop offset="1" stop-color="#165778" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Automations: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M22.7355 23.74H17.2853L15.9955 27H13L18.6999 13H19.9896C20.891 13 21.5012 13.4 21.8202 14.2L27 27H24.0045L22.7355 23.74ZM18.055 21.42H21.9658L20.0312 16.38H20.0104L18.055 21.42Z" fill="#475467" />
        </svg>
    ),
    AutomationsHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M22.7355 23.74H17.2853L15.9955 27H13L18.6999 13H19.9896C20.891 13 21.5012 13.4 21.8202 14.2L27 27H24.0045L22.7355 23.74ZM18.055 21.42H21.9658L20.0312 16.38H20.0104L18.055 21.42Z" fill="url(#paint0_linear_13917_108223)" />
            <defs>
                <linearGradient id="paint0_linear_13917_108223" x1="27" y1="27" x2="20" y2="16" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#007AF5" />
                    <stop offset="1" stopColor="#FF00B3" />
                </linearGradient>
            </defs>
        </svg>
    ),
    LabelsAndForms: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M20 18H30V20.4H22.6336V24.16H29.2939V26.56H22.6336V32H20V18Z" fill="#475467" />
            <path d="M17 13.0721L17.5505 12.541C18.1865 11.9246 18.5046 11.177 18.5046 10.2984V9H21V10.2984C21 11.177 20.8471 11.9705 20.5413 12.6787C20.2477 13.3869 19.8135 13.9836 19.2385 14.4689L18.6147 15L17 13.0721Z" fill="#475467" />
            <path d="M11.8726 23C11.3063 23 10.8494 22.8333 10.5019 22.5C10.1673 22.1533 10 21.7 10 21.14V9H12.6641V20.6H18V23H11.8726Z" fill="#475467" />
        </svg>
    ),
    LabelsAndFormsHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M20 18H30V20.4H22.6336V24.16H29.2939V26.56H22.6336V32H20V18Z" fill="url(#paint0_linear_13917_108228)" />
            <path d="M17 13.0721L17.5505 12.541C18.1865 11.9246 18.5046 11.177 18.5046 10.2984V9H21V10.2984C21 11.177 20.8471 11.9705 20.5413 12.6787C20.2477 13.3869 19.8135 13.9836 19.2385 14.4689L18.6147 15L17 13.0721Z" fill="url(#paint1_linear_13917_108228)" />
            <path d="M11.8726 23C11.3063 23 10.8494 22.8333 10.5019 22.5C10.1673 22.1533 10 21.7 10 21.14V9H12.6641V20.6H18V23H11.8726Z" fill="url(#paint2_linear_13917_108228)" />
            <defs>
                <linearGradient id="paint0_linear_13917_108228" x1="10" y1="9" x2="29.8475" y2="32.1109" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4B106" />
                    <stop offset="1" stopColor="#5FA537" />
                </linearGradient>
                <linearGradient id="paint1_linear_13917_108228" x1="10" y1="9" x2="29.8475" y2="32.1109" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4B106" />
                    <stop offset="1" stopColor="#5FA537" />
                </linearGradient>
                <linearGradient id="paint2_linear_13917_108228" x1="10" y1="9" x2="29.8475" y2="32.1109" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D4B106" />
                    <stop offset="1" stopColor="#5FA537" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Settings: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M15.2374 25.7995C14.4088 24.9992 14 23.8799 14 22.4469H16.7178C16.7178 23.1228 16.8946 23.6582 17.2481 24.0421C17.6016 24.426 18.0878 24.6207 18.7175 24.6207H20.9326C21.5181 24.6207 21.9932 24.5017 22.3633 24.2584C22.7279 24.0151 22.9102 23.696 22.9102 23.2905V22.6253C22.9102 21.9873 22.4296 21.5871 21.474 21.4303L17.8005 20.8246C16.6018 20.63 15.6903 20.2569 15.0717 19.6999C14.453 19.1483 14.1436 18.4399 14.1436 17.5801V16.4824C14.1436 15.7903 14.3314 15.1846 14.7126 14.6547C15.0938 14.1248 15.6296 13.7192 16.3311 13.4326C17.0327 13.146 17.8392 13 18.7562 13H21.0155C21.8827 13 22.645 13.1784 23.3134 13.5299C23.9818 13.8814 24.4956 14.3735 24.8602 15.0062C25.2247 15.6389 25.407 16.3743 25.407 17.207H22.6892C22.6892 16.6609 22.5346 16.2175 22.2307 15.8876C21.9269 15.5577 21.5182 15.3901 21.0099 15.3901H18.7506C18.1927 15.3901 17.7397 15.5091 17.4028 15.7416C17.0658 15.9741 16.8946 16.2878 16.8946 16.6825V17.2124C16.8946 17.8667 17.3531 18.2669 18.2756 18.4237L21.9324 19.051C23.1422 19.2619 24.0702 19.6296 24.711 20.1541C25.3518 20.6786 25.6722 21.3654 25.6722 22.1981V23.4905C25.6722 24.1827 25.4733 24.7937 25.0811 25.3291C24.6889 25.8644 24.1365 26.2754 23.435 26.5728C22.7279 26.8648 21.9104 27.0108 20.9768 27.0108H18.6788C17.215 27.0108 16.066 26.6107 15.2429 25.8104L15.2374 25.7995Z" fill="#475467" />
        </svg>
    ),
    SettingsHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none" {...props}>
            <path d="M15.2374 25.7995C14.4088 24.9992 14 23.8799 14 22.4469H16.7178C16.7178 23.1228 16.8946 23.6582 17.2481 24.0421C17.6016 24.426 18.0878 24.6207 18.7175 24.6207H20.9326C21.5181 24.6207 21.9932 24.5017 22.3633 24.2584C22.7279 24.0151 22.9102 23.696 22.9102 23.2905V22.6253C22.9102 21.9873 22.4296 21.5871 21.474 21.4303L17.8005 20.8246C16.6018 20.63 15.6903 20.2569 15.0717 19.6999C14.453 19.1483 14.1436 18.4399 14.1436 17.5801V16.4824C14.1436 15.7903 14.3314 15.1846 14.7126 14.6547C15.0938 14.1248 15.6296 13.7192 16.3311 13.4326C17.0327 13.146 17.8392 13 18.7562 13H21.0155C21.8827 13 22.645 13.1784 23.3134 13.5299C23.9818 13.8814 24.4956 14.3735 24.8602 15.0062C25.2247 15.6389 25.407 16.3743 25.407 17.207H22.6892C22.6892 16.6609 22.5346 16.2175 22.2307 15.8876C21.9269 15.5577 21.5182 15.3901 21.0099 15.3901H18.7506C18.1927 15.3901 17.7397 15.5091 17.4028 15.7416C17.0658 15.9741 16.8946 16.2878 16.8946 16.6825V17.2124C16.8946 17.8667 17.3531 18.2669 18.2756 18.4237L21.9324 19.051C23.1422 19.2619 24.0702 19.6296 24.711 20.1541C25.3518 20.6786 25.6722 21.3654 25.6722 22.1981V23.4905C25.6722 24.1827 25.4733 24.7937 25.0811 25.3291C24.6889 25.8644 24.1365 26.2754 23.435 26.5728C22.7279 26.8648 21.9104 27.0108 20.9768 27.0108H18.6788C17.215 27.0108 16.066 26.6107 15.2429 25.8104L15.2374 25.7995Z" fill="url(#paint0_linear_13917_108233)" />
            <defs>
                <linearGradient id="paint0_linear_13917_108233" x1="17.5" y1="17" x2="25.5" y2="29" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#677281" />
                    <stop offset="1" stopColor="#0C1520" />
                </linearGradient>
            </defs>
        </svg>
    ),
    AllApps: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" fill="#475467" />
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="#475467" />
            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="#475467" />
            <path d="M19 6C19.5523 6 20 5.55228 20 5C20 4.44772 19.5523 4 19 4C18.4477 4 18 4.44772 18 5C18 5.55228 18.4477 6 19 6Z" fill="#475467" />
            <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" fill="#475467" />
            <path d="M19 20C19.5523 20 20 19.5523 20 19C20 18.4477 19.5523 18 19 18C18.4477 18 18 18.4477 18 19C18 19.5523 18.4477 20 19 20Z" fill="#475467" />
            <path d="M5 6C5.55228 6 6 5.55228 6 5C6 4.44772 5.55228 4 5 4C4.44772 4 4 4.44772 4 5C4 5.55228 4.44772 6 5 6Z" fill="#475467" />
            <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" fill="#475467" />
            <path d="M5 20C5.55228 20 6 19.5523 6 19C6 18.4477 5.55228 18 5 18C4.44772 18 4 18.4477 4 19C4 19.5523 4.44772 20 5 20Z" fill="#475467" />
        </svg>
    ),
    AllAppsHover: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 6.5C12.8284 6.5 13.5 5.82843 13.5 5C13.5 4.17157 12.8284 3.5 12 3.5C11.1716 3.5 10.5 4.17157 10.5 5C10.5 5.82843 11.1716 6.5 12 6.5ZM12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5ZM12 20.5C12.8284 20.5 13.5 19.8284 13.5 19C13.5 18.1716 12.8284 17.5 12 17.5C11.1716 17.5 10.5 18.1716 10.5 19C10.5 19.8284 11.1716 20.5 12 20.5ZM19 6.5C19.8284 6.5 20.5 5.82843 20.5 5C20.5 4.17157 19.8284 3.5 19 3.5C18.1716 3.5 17.5 4.17157 17.5 5C17.5 5.82843 18.1716 6.5 19 6.5ZM19 13.5C19.8284 13.5 20.5 12.8284 20.5 12C20.5 11.1716 19.8284 10.5 19 10.5C18.1716 10.5 17.5 11.1716 17.5 12C17.5 12.8284 18.1716 13.5 19 13.5ZM19 20.5C19.8284 20.5 20.5 19.8284 20.5 19C20.5 18.1716 19.8284 17.5 19 17.5C18.1716 17.5 17.5 18.1716 17.5 19C17.5 19.8284 18.1716 20.5 19 20.5ZM5 6.5C5.82843 6.5 6.5 5.82843 6.5 5C6.5 4.17157 5.82843 3.5 5 3.5C4.17157 3.5 3.5 4.17157 3.5 5C3.5 5.82843 4.17157 6.5 5 6.5ZM5 13.5C5.82843 13.5 6.5 12.8284 6.5 12C6.5 11.1716 5.82843 10.5 5 10.5C4.17157 10.5 3.5 11.1716 3.5 12C3.5 12.8284 4.17157 13.5 5 13.5ZM5 20.5C5.82843 20.5 6.5 19.8284 6.5 19C6.5 18.1716 5.82843 17.5 5 17.5C4.17157 17.5 3.5 18.1716 3.5 19C3.5 19.8284 4.17157 20.5 5 20.5Z" fill="url(#paint0_linear_14005_45149)" stroke="url(#paint1_linear_14005_45149)" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
                <linearGradient id="paint0_linear_14005_45149" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00C7BE" />
                    <stop offset="1" stopColor="#0040DD" />
                </linearGradient>
                <linearGradient id="paint1_linear_14005_45149" x1="12" y1="4" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00C7BE" />
                    <stop offset="1" stopColor="#0040DD" />
                </linearGradient>
            </defs>
        </svg>
    ),
    Help: (props: IconProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.2C21 14.8802 21 15.7202 20.673 16.362C20.3854 16.9265 19.9265 17.3854 19.362 17.673C18.7202 18 17.8802 18 16.2 18H9.68375C9.0597 18 8.74767 18 8.44921 18.0613C8.18443 18.1156 7.9282 18.2055 7.68749 18.3285C7.41617 18.4671 7.17252 18.662 6.68521 19.0518L4.29976 20.9602C3.88367 21.2931 3.67563 21.4595 3.50054 21.4597C3.34827 21.4599 3.20422 21.3906 3.10923 21.2716C3 21.1348 3 20.8684 3 20.3355V7.8Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    HelpHover: (props: IconProps) => (
        // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        //     <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.2C21 14.8802 21 15.7202 20.673 16.362C20.3854 16.9265 19.9265 17.3854 19.362 17.673C18.7202 18 17.8802 18 16.2 18H9.68375C9.0597 18 8.74767 18 8.44921 18.0613C8.18443 18.1156 7.9282 18.2055 7.68749 18.3285C7.41617 18.4671 7.17252 18.662 6.68521 19.0518L4.29976 20.9602C3.88367 21.2931 3.67563 21.4595 3.50054 21.4597C3.34827 21.4599 3.20422 21.3906 3.10923 21.2716C3 21.1348 3 20.8684 3 20.3355V7.8Z" fill="url(#paint0_angular_14005_46252)" />
        //     <defs>
        //         <radialGradient id="paint0_angular_14005_46252" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(12 10.5) rotate(126.027) scale(13.6015 13.2628)">
        //             <stop stop-color="#007AF5" />
        //             <stop offset="1" stop-color="#00C7BE" />
        //         </radialGradient>
        //     </defs>
        // </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M3 7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V13.2C21 14.8802 21 15.7202 20.673 16.362C20.3854 16.9265 19.9265 17.3854 19.362 17.673C18.7202 18 17.8802 18 16.2 18H9.68375C9.0597 18 8.74767 18 8.44921 18.0613C8.18443 18.1156 7.9282 18.2055 7.68749 18.3285C7.41617 18.4671 7.17252 18.662 6.68521 19.0518L4.29976 20.9602C3.88367 21.2931 3.67563 21.4595 3.50054 21.4597C3.34827 21.4599 3.20422 21.3906 3.10923 21.2716C3 21.1348 3 20.8684 3 20.3355V7.8Z" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
}