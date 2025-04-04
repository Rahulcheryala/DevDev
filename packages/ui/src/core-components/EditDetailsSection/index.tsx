import { useState, ReactNode } from 'react'
import { cn } from '../../utils'

export interface AddressData {
    title: string
    isPrimary?: boolean
    isActive?: boolean
    address: {
        street: string
        city: string
        state: string
        zip: string
        country: string
    }
    contact: {
        name: string
        email: string
        phone: string
    }
    additionalContacts?: Array<{
        name: string
        email: string
        phone: string
    }>
}

const defaultAddresses: AddressData[] = [
    {
        title: 'Headquarters',
        isPrimary: true,
        isActive: true,
        address: {
            street: '1441 S Kostner Ave',
            city: 'Chicago',
            state: 'Illinois(IL)',
            zip: '60623',
            country: 'United States'
        },
        contact: {
            name: 'John Doe',
            email: 'Johndoe@mail.com',
            phone: '+91-12345667809'
        },
        additionalContacts: [
            {
                name: 'Jane Smith',
                email: 'jane.smith@mail.com',
                phone: '+91-9876543210'
            },
            {
                name: 'Mike Johnson',
                email: 'mike.j@mail.com',
                phone: '+91-5555555555'
            }
        ]
    },
    // {
    //     title: 'Shipping',
    //     isActive: false,
    //     address: {
    //         street: '1441 S Kostner Ave',
    //         city: 'Chicago',
    //         state: 'Illinois(IL)',
    //         zip: '60623',
    //         country: 'United States'
    //     },
    //     contact: {
    //         name: 'John Doe',
    //         email: 'Johndoe@mail.com',
    //         phone: '+91-12345667809'
    //     },
    //     additionalContacts: [
    //         {
    //             name: 'Sarah Wilson',
    //             email: 'sarah.w@mail.com',
    //             phone: '+91-1111111111'
    //         },
    //         {
    //             name: 'Tom Brown',
    //             email: 'tom.b@mail.com',
    //             phone: '+91-2222222222'
    //         }
    //     ]
    // },
    // {
    //     title: 'Billing',
    //     isActive: true,
    //     address: {
    //         street: '1441 S Kostner Ave',
    //         city: 'Chicago',
    //         state: 'Illinois(IL)',
    //         zip: '60623',
    //         country: 'United States'
    //     },
    //     contact: {
    //         name: 'John Doe',
    //         email: 'Johndoe@mail.com',
    //         phone: '+91-12345667809'
    //     },
    //     additionalContacts: [
    //         {
    //             name: 'Alex Davis',
    //             email: 'alex.d@mail.com',
    //             phone: '+91-3333333333'
    //         },
    //         {
    //             name: 'Emma White',
    //             email: 'emma.w@mail.com',
    //             phone: '+91-4444444444'
    //         }
    //     ]
    // }
]

const AddressSection = ({ data, onEdit, isEditing }: { data: AddressData, onEdit?: () => void, isEditing?: boolean }) => {
    const [isSectionExpanded, setIsSectionExpanded] = useState(true)
    const [showMoreContacts, setShowMoreContacts] = useState(false)

    return (
        <div className="flex">
            {/* Title Section */}
            <div className="relative w-[400px] p-6 bg-[rgba(255,255,255,0.50)] rounded-l-xl">
                <div className="flex items-center gap-2">
                    <h3 className="text-[28px] font-medium text-[#677281]">{data.title}</h3>
                    {data.isPrimary && (
                        <svg width="103" height="36" viewBox="0 0 103 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="103" height="36" rx="12" fill="#FFCC00" />
                            <path d="M25.9869 17.4788L24.8538 22.6258C24.8313 22.7335 24.773 22.8298 24.6889 22.898C24.6049 22.9663 24.5003 23.0023 24.3932 22.9999H15.5675C15.4604 23.0023 15.3558 22.9663 15.2717 22.898C15.1876 22.8298 15.1293 22.7335 15.1069 22.6258L14.0106 17.4788C13.9921 17.3918 13.9979 17.3013 14.0272 17.2175C14.0566 17.1338 14.1083 17.0602 14.1764 17.0053C14.2447 16.9502 14.3268 16.9161 14.4132 16.9068C14.4996 16.8976 14.5868 16.9137 14.6647 16.9532L17.3547 18.2932L19.5842 14.24C19.6244 14.1672 19.6826 14.1066 19.753 14.0644C19.8234 14.0222 19.9035 14 19.9849 14C20.0664 14 20.1464 14.0222 20.2168 14.0644C20.2873 14.1066 20.3455 14.1672 20.3857 14.24L22.6151 18.298L25.3236 16.9485C25.4021 16.9057 25.4909 16.8872 25.5793 16.8951C25.6678 16.903 25.7521 16.9371 25.8222 16.9931C25.8922 17.0491 25.9451 17.1248 25.9743 17.2109C26.0035 17.2971 26.0079 17.3901 25.9869 17.4788Z" fill="#0D0C22" />
                            <path d="M44.382 12.85C46.734 12.85 48.638 13.312 48.638 15.972C48.638 18.52 46.832 19.066 44.382 19.066H42.716V23H41.12V12.85H44.382ZM42.716 14.166V17.722H44.48C45.894 17.722 46.986 17.554 46.986 15.986C46.986 14.334 45.81 14.166 44.438 14.166H42.716ZM53.8363 16.966C53.5703 16.938 53.3183 16.924 53.0803 16.924C51.9603 16.924 51.3723 17.47 51.3723 19.052V23H49.9163V15.468H51.3443V16.798C51.7363 15.944 52.4923 15.454 53.4303 15.44C53.5563 15.44 53.7103 15.44 53.8363 15.454V16.966ZM56.6446 12.85V14.46H55.1886V12.85H56.6446ZM56.6446 15.468V23H55.1886V15.468H56.6446ZM60.2626 23H58.8066V15.468H60.2626V16.56C60.6966 15.818 61.4106 15.328 62.4886 15.328C63.6506 15.328 64.3366 15.818 64.6726 16.658C65.3026 15.72 66.1846 15.328 67.1646 15.328C68.9286 15.328 69.6146 16.504 69.6146 18.254V23H68.1586V18.646C68.1586 17.554 67.9906 16.546 66.6746 16.546C65.5266 16.546 64.9386 17.456 64.9386 18.954V23H63.4826V18.646C63.4826 17.554 63.3146 16.546 61.9986 16.546C60.8366 16.546 60.2626 17.456 60.2626 18.954V23ZM71.205 20.97C71.205 19.136 73.361 18.646 76.287 18.338V18.184C76.287 16.854 75.587 16.406 74.663 16.406C73.655 16.406 73.081 16.924 73.025 17.848H71.555C71.681 16.252 72.997 15.286 74.719 15.286C76.665 15.286 77.785 16.224 77.757 18.478C77.757 18.66 77.729 19.962 77.729 20.284C77.729 21.404 77.799 22.328 77.939 23H76.539C76.483 22.706 76.441 22.482 76.413 22.006C75.965 22.762 75.111 23.182 73.893 23.182C72.367 23.182 71.205 22.342 71.205 20.97ZM76.357 19.416C74.019 19.64 72.787 19.962 72.787 20.942C72.787 21.628 73.333 22.062 74.215 22.062C75.419 22.062 76.357 21.46 76.357 19.962V19.416ZM83.6754 16.966C83.4094 16.938 83.1574 16.924 82.9194 16.924C81.7994 16.924 81.2114 17.47 81.2114 19.052V23H79.7554V15.468H81.1834V16.798C81.5754 15.944 82.3314 15.454 83.2694 15.44C83.3954 15.44 83.5494 15.44 83.6754 15.454V16.966ZM84.6497 25.45V24.288H85.2237C86.0077 24.288 86.3437 24.232 86.7077 23.154L86.7637 22.986L84.0477 15.468H85.6577L87.4777 21.082L89.2557 15.468H90.7677L88.1077 23.168C87.4917 24.946 87.0437 25.45 85.3497 25.45H84.6497Z" fill="#101828" />
                        </svg>
                    )}
                </div>

                {/* Status and Action Icons */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                    {data.isActive ? (
                        <svg width="97" height="32" viewBox="0 0 97 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="97" height="32" rx="12" fill="white" />
                            <path d="M18 11.125C17.0358 11.125 16.0933 11.4109 15.2916 11.9466C14.4899 12.4823 13.8651 13.2436 13.4961 14.1344C13.1271 15.0252 13.0306 16.0054 13.2187 16.9511C13.4068 17.8967 13.8711 18.7654 14.5529 19.4471C15.2346 20.1289 16.1033 20.5932 17.0489 20.7813C17.9946 20.9694 18.9748 20.8729 19.8656 20.5039C20.7564 20.1349 21.5177 19.5101 22.0534 18.7084C22.5891 17.9067 22.875 16.9642 22.875 16C22.8736 14.7075 22.3596 13.4683 21.4456 12.5544C20.5317 11.6404 19.2925 11.1264 18 11.125ZM18 20.125C17.1842 20.125 16.3866 19.8831 15.7083 19.4298C15.0299 18.9766 14.5012 18.3323 14.189 17.5786C13.8768 16.8248 13.7951 15.9954 13.9543 15.1953C14.1134 14.3951 14.5063 13.6601 15.0832 13.0832C15.6601 12.5063 16.3951 12.1134 17.1953 11.9543C17.9954 11.7951 18.8248 11.8768 19.5786 12.189C20.3323 12.5012 20.9766 13.0299 21.4298 13.7083C21.8831 14.3866 22.125 15.1842 22.125 16C22.1238 17.0936 21.6888 18.1421 20.9154 18.9154C20.1421 19.6888 19.0936 20.1238 18 20.125ZM20.625 16C20.625 16.5192 20.471 17.0267 20.1826 17.4584C19.8942 17.8901 19.4842 18.2265 19.0045 18.4252C18.5249 18.6239 17.9971 18.6758 17.4879 18.5746C16.9787 18.4733 16.511 18.2233 16.1438 17.8562C15.7767 17.489 15.5267 17.0213 15.4254 16.5121C15.3242 16.0029 15.3761 15.4751 15.5748 14.9955C15.7735 14.5158 16.11 14.1058 16.5416 13.8174C16.9733 13.529 17.4808 13.375 18 13.375C18.696 13.3757 19.3632 13.6525 19.8553 14.1447C20.3475 14.6368 20.6243 15.304 20.625 16Z" fill="#28CD41" />
                            <path d="M40.0655 10.85H41.9415L45.7495 21H43.8035L43.0055 18.746H38.8895L38.1055 21H36.2855L40.0655 10.85ZM39.4075 17.262H42.4735L40.9335 12.908L39.4075 17.262ZM54.9019 17.626C54.4819 19.894 52.8579 21.182 50.5199 21.182C47.5519 21.182 45.8299 19.068 45.8299 15.89C45.8299 12.698 47.6639 10.668 50.6039 10.668C52.8579 10.668 54.4679 11.956 54.8739 14.224H53.1659C52.8579 12.852 51.8639 12.124 50.5479 12.124C48.9379 12.124 47.6639 13.44 47.6639 15.89C47.6639 18.354 48.9099 19.726 50.5339 19.726C51.9059 19.726 52.8859 19.012 53.1939 17.626H54.9019ZM58.2382 12.334H55.0462V10.85H63.2082V12.334H60.0162V21H58.2382V12.334ZM66.1031 21H64.3251V10.85H66.1031V21ZM69.1052 10.85L71.6812 18.9L74.1872 10.85H76.0632L72.5912 21H70.6872L67.1732 10.85H69.1052ZM77.1232 10.85H84.3053V12.334H78.9012V15.05H84.0112V16.52H78.9012V19.502H84.3053V21H77.1232V10.85Z" fill="#28CD41" />
                        </svg>
                    ) : (
                        <svg width="107" height="32" viewBox="0 0 107 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="107" height="32" rx="12" fill="white" />
                            <path d="M18 11.125C17.0358 11.125 16.0933 11.4109 15.2916 11.9466C14.4899 12.4823 13.8651 13.2436 13.4961 14.1344C13.1271 15.0252 13.0306 16.0054 13.2187 16.9511C13.4068 17.8967 13.8711 18.7654 14.5529 19.4471C15.2346 20.1289 16.1033 20.5932 17.0489 20.7813C17.9946 20.9694 18.9748 20.8729 19.8656 20.5039C20.7564 20.1349 21.5177 19.5101 22.0534 18.7084C22.5891 17.9067 22.875 16.9642 22.875 16C22.8736 14.7075 22.3596 13.4683 21.4456 12.5544C20.5317 11.6404 19.2925 11.1264 18 11.125ZM18 20.125C17.1842 20.125 16.3866 19.8831 15.7083 19.4298C15.0299 18.9766 14.5012 18.3323 14.189 17.5786C13.8768 16.8248 13.7951 15.9954 13.9543 15.1953C14.1134 14.3951 14.5063 13.6601 15.0832 13.0832C15.6601 12.5063 16.3951 12.1134 17.1953 11.9543C17.9954 11.7951 18.8248 11.8768 19.5786 12.189C20.3323 12.5012 20.9766 13.0299 21.4298 13.7083C21.8831 14.3866 22.125 15.1842 22.125 16C22.1238 17.0936 21.6888 18.1421 20.9154 18.9154C20.1421 19.6888 19.0936 20.1238 18 20.125ZM20.625 16C20.625 16.5192 20.471 17.0267 20.1826 17.4584C19.8942 17.8901 19.4842 18.2265 19.0045 18.4252C18.5249 18.6239 17.9971 18.6758 17.4879 18.5746C16.9787 18.4733 16.511 18.2233 16.1438 17.8562C15.7767 17.489 15.5267 17.0213 15.4254 16.5121C15.3242 16.0029 15.3761 15.4751 15.5748 14.9955C15.7735 14.5158 16.11 14.1058 16.5416 13.8174C16.9733 13.529 17.4808 13.375 18 13.375C18.696 13.3757 19.3632 13.6525 19.8553 14.1447C20.3475 14.6368 20.6243 15.304 20.625 16Z" fill="#677281" />
                            <path d="M34.9208 21H33.1428V10.85H34.9208V21ZM43.0189 21L38.7209 12.894V21H36.9989V10.85H39.3789L43.6769 18.956V10.85H45.3989V21H43.0189ZM50.2302 10.85H52.1062L55.9142 21H53.9682L53.1702 18.746H49.0542L48.2702 21H46.4502L50.2302 10.85ZM49.5722 17.262H52.6382L51.0982 12.908L49.5722 17.262ZM65.0666 17.626C64.6466 19.894 63.0226 21.182 60.6846 21.182C57.7166 21.182 55.9946 19.068 55.9946 15.89C55.9946 12.698 57.8286 10.668 60.7686 10.668C63.0226 10.668 64.6326 11.956 65.0386 14.224H63.3306C63.0226 12.852 62.0286 12.124 60.7126 12.124C59.1026 12.124 57.8286 13.44 57.8286 15.89C57.8286 18.354 59.0746 19.726 60.6986 19.726C62.0706 19.726 63.0506 19.012 63.3586 17.626H65.0666ZM68.403 12.334H65.211V10.85H73.373V12.334H70.181V21H68.403V12.334ZM76.2678 21H74.4898V10.85H76.2678V21ZM79.2699 10.85L81.8459 18.9L84.3519 10.85H86.2279L82.7559 21H80.8519L77.3379 10.85H79.2699ZM87.288 10.85H94.47V12.334H89.066V15.05H94.176V16.52H89.066V19.502H94.47V21H87.288V10.85Z" fill="#677281" />
                        </svg>
                    )}
                    <div className="flex items-center gap-2">
                        <button className="text-[#677281] hover:text-[#101828]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M9.99998 16.6662H17.5M2.5 16.6662H3.89545C4.3031 16.6662 4.50693 16.6662 4.69874 16.6202C4.8688 16.5793 5.03138 16.512 5.1805 16.4206C5.34869 16.3175 5.49282 16.1734 5.78107 15.8852L16.25 5.4162C16.9404 4.72585 16.9404 3.60656 16.25 2.9162C15.5597 2.22585 14.4404 2.22585 13.75 2.9162L3.28105 13.3852C2.9928 13.6734 2.84867 13.8175 2.7456 13.9857C2.65422 14.1348 2.58688 14.2974 2.54605 14.4675C2.5 14.6593 2.5 14.8631 2.5 15.2708V16.6662Z" stroke="#677281" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="text-[#677281] hover:text-[#101828]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.5215 3.25C10.4179 3.25 10.334 3.33395 10.334 3.4375C10.334 3.54105 10.4179 3.625 10.5215 3.625C10.625 3.625 10.709 3.54105 10.709 3.4375C10.709 3.33395 10.625 3.25 10.5215 3.25ZM8.83398 3.4375C8.83398 2.50552 9.5895 1.75 10.5215 1.75C11.4535 1.75 12.209 2.50552 12.209 3.4375C12.209 4.36948 11.4535 5.125 10.5215 5.125C9.5895 5.125 8.83398 4.36948 8.83398 3.4375ZM10.5215 9.8125C10.4179 9.8125 10.334 9.89645 10.334 10C10.334 10.1036 10.4179 10.1875 10.5215 10.1875C10.625 10.1875 10.709 10.1036 10.709 10C10.709 9.89645 10.625 9.8125 10.5215 9.8125ZM8.83398 10C8.83398 9.06802 9.5895 8.3125 10.5215 8.3125C11.4535 8.3125 12.209 9.06802 12.209 10C12.209 10.932 11.4535 11.6875 10.5215 11.6875C9.5895 11.6875 8.83398 10.932 8.83398 10ZM10.5215 16.375C10.4179 16.375 10.334 16.4589 10.334 16.5625C10.334 16.6661 10.4179 16.75 10.5215 16.75C10.625 16.75 10.709 16.6661 10.709 16.5625C10.709 16.4589 10.625 16.375 10.5215 16.375ZM8.83398 16.5625C8.83398 15.6305 9.5895 14.875 10.5215 14.875C11.4535 14.875 12.209 15.6305 12.209 16.5625C12.209 17.4945 11.4535 18.25 10.5215 18.25C9.5895 18.25 8.83398 17.4945 8.83398 16.5625Z" fill="#475467" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex-1 bg-white rounded-r-xl">
                {isSectionExpanded && (
                    <div>
                        {/* Address Section */}
                        <div className="flex h-[200px] p-6 flex-col items-start gap-6 bg-white">
                            <h4 className="font-['Suisse_Int\\'l'] text-base font-semibold leading-5 tracking-[0.2px] text-[#475467] uppercase">
                                ADDRESS
                            </h4>
                            <div className="font-['Suisse_Int\\'l'] text-base font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">
                                <p>{data.address.street}</p>
                                <p>{data.address.city}, {data.address.state} {data.address.zip}</p>
                                <p>{data.address.country}</p>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="flex p-6 flex-col items-start gap-6 bg-[#F7F7F8]">
                            <h4 className="font-['Suisse_Int\\'l'] text-base font-semibold leading-5 tracking-[0.2px] text-[#475467] uppercase">
                                CONTACT
                            </h4>
                            <div className="space-y-6">
                                {/* Primary Contact */}
                                <div>
                                    <p className="font-['Suisse_Int\\'l'] text-base font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">
                                        {data.contact.name}
                                    </p>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.917 14.9997L12.3813 9.99967M7.61937 9.99967L2.08369 14.9997M1.66699 5.83301L8.47109 10.5959C9.02207 10.9816 9.29756 11.1744 9.59721 11.2491C9.8619 11.3151 10.1387 11.3151 10.4034 11.2491C10.7031 11.1744 10.9786 10.9816 11.5296 10.5959L18.3337 5.83301M5.66699 16.6663H14.3337C15.7338 16.6663 16.4339 16.6663 16.9686 16.3939C17.439 16.1542 17.8215 15.7717 18.0612 15.3013C18.3337 14.7665 18.3337 14.0665 18.3337 12.6663V7.33301C18.3337 5.93288 18.3337 5.23281 18.0612 4.69803C17.8215 4.22763 17.439 3.84517 16.9686 3.60549C16.4339 3.33301 15.7338 3.33301  14.3337 3.33301H5.66699C4.26686 3.33301 3.5668 3.33301 3.03202 3.60549C2.56161 3.84517 2.17916 4.22763 1.93948 4.69803C1.66699 5.23281 1.66699 5.93288 1.66699 7.33301V12.6663C1.66699 14.0665 1.66699 14.7665 1.93948 15.3013C2.17916 15.7717 2.56161 16.1542 3.03202 16.3939C3.5668 16.6663 4.26686 16.6663 5.66699 16.6663Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <a
                                                href={`mailto:${data.contact.email}`}
                                                className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-5 tracking-[0.2px] text-[#475467]"
                                            >
                                                {data.contact.email}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M6.98356 7.37779C7.56356 8.58581 8.35422 9.71801 9.35553 10.7193C10.3568 11.7206 11.4891 12.5113 12.6971 13.0913C12.801 13.1412 12.8529 13.1661 12.9187 13.1853C13.1523 13.2534 13.4392 13.2045 13.637 13.0628C13.6927 13.0229 13.7403 12.9753 13.8356 12.88C14.1269 12.5887 14.2726 12.443 14.4191 12.3478C14.9715 11.9886 15.6837 11.9886 16.2361 12.3478C16.3825 12.443 16.5282 12.5887 16.8196 12.88L16.9819 13.0424C17.4248 13.4853 17.6462 13.7067 17.7665 13.9446C18.0058 14.4175 18.0058 14.9761 17.7665 15.449C17.6462 15.6869 17.4248 15.9083 16.9819 16.3512L16.8506 16.4825C16.4092 16.9239 16.1886 17.1446 15.8885 17.3131C15.5556 17.5001 15.0385 17.6346 14.6567 17.6334C14.3126 17.6324 14.0774 17.5657 13.607 17.4322C11.0792 16.7147 8.69387 15.361 6.70388 13.371C4.7139 11.381 3.36017 8.99569 2.6427 6.46786C2.50919 5.99749 2.44244 5.7623 2.44141 5.41818C2.44028 5.03633 2.57475 4.51925 2.76176 4.18633C2.9303 3.88631 3.15098 3.66563 3.59233 3.22428L3.72369 3.09292C4.16656 2.65005 4.388 2.42861 4.62581 2.30833C5.09878 2.0691 5.65734 2.0691 6.1303 2.30832C6.36812 2.42861 6.58955 2.65005 7.03242 3.09291L7.19481 3.25531C7.48615 3.54665 7.63182 3.69231 7.72706 3.8388C8.08622 4.3912 8.08622 5.10336 7.72706 5.65576C7.63182 5.80225 7.48615 5.94791 7.19481 6.23925C7.09955 6.33451 7.05192 6.38214 7.01206 6.43782C6.87038 6.63568 6.82146 6.92256 6.88957 7.15619C6.90873 7.22193 6.93367 7.27389 6.98356 7.37779Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            <a
                                                href={`tel:${data.contact.phone}`}
                                                className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-5 tracking-[0.2px] text-[#475467]"
                                            >
                                                {data.contact.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Contacts */}
                                {showMoreContacts && data.additionalContacts?.map((contact, index) => (
                                    <div key={index}>
                                        <p className="font-['Suisse_Int\\'l'] text-base font-medium leading-6 tracking-[0.2px] text-[#0D0C22]">
                                            {contact.name}
                                        </p>
                                        <div className="flex items-center gap-4 mt-1">
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M17.917 14.9997L12.3813 9.99967M7.61937 9.99967L2.08369 14.9997M1.66699 5.83301L8.47109 10.5959C9.02207 10.9816 9.29756 11.1744 9.59721 11.2491C9.8619 11.3151 10.1387 11.3151 10.4034 11.2491C10.7031 11.1744 10.9786 10.9816 11.5296 10.5959L18.3337 5.83301M5.66699 16.6663H14.3337C15.7338 16.6663 16.4339 16.6663 16.9686 16.3939C17.439 16.1542 17.8215 15.7717 18.0612 15.3013C18.3337 14.7665 18.3337 14.0665 18.3337 12.6663V7.33301C18.3337 5.93288 18.3337 5.23281 18.0612 4.69803C17.8215 4.22763 17.439 3.84517 16.9686 3.60549C16.4339 3.33301 15.7338 3.33301 14.3337 3.33301H5.66699C4.26686 3.33301 3.5668 3.33301 3.03202 3.60549C2.56161 3.84517 2.17916 4.22763 1.93948 4.69803C1.66699 5.23281 1.66699 5.93288 1.66699 7.33301V12.6663C1.66699 14.0665 1.66699 14.7665 1.93948 15.3013C2.17916 15.7717 2.56161 16.1542 3.03202 16.3939C3.5668 16.6663 4.26686 16.6663 5.66699 16.6663Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <a
                                                    href={`mailto:${contact.email}`}
                                                    className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-5 tracking-[0.2px] text-[#475467]"
                                                >
                                                    {contact.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M6.98356 7.37779C7.56356 8.58581 8.35422 9.71801 9.35553 10.7193C10.3568 11.7206 11.4891 12.5113 12.6971 13.0913C12.801 13.1412 12.8529 13.1661 12.9187 13.1853C13.1523 13.2534 13.4392 13.2045 13.637 13.0628C13.6927 13.0229 13.7403 12.9753 13.8356 12.88C14.1269 12.5887 14.2726 12.443 14.4191 12.3478C14.9715 11.9886 15.6837 11.9886 16.2361 12.3478C16.3825 12.443 16.5282 12.5887 16.8196 12.88L16.9819 13.0424C17.4248 13.4853 17.6462 13.7067 17.7665 13.9446C18.0058 14.4175 18.0058 14.9761 17.7665 15.449C17.6462 15.6869 17.4248 15.9083 16.9819 16.3512L16.8506 16.4825C16.4092 16.9239 16.1886 17.1446 15.8885 17.3131C15.5556 17.5001 15.0385 17.6346 14.6567 17.6334C14.3126 17.6324 14.0774 17.5657 13.607 17.4322C11.0792 16.7147 8.69387 15.361 6.70388 13.371C4.7139 11.381 3.36017 8.99569 2.6427 6.46786C2.50919 5.99749 2.44244 5.7623 2.44141 5.41818C2.44028 5.03633 2.57475 4.51925 2.76176 4.18633C2.9303 3.88631 3.15098 3.66563 3.59233 3.22428L3.72369 3.09292C4.16656 2.65005 4.388 2.42861 4.62581 2.30833C5.09878 2.0691 5.65734 2.0691 6.1303 2.30832C6.36812 2.42861 6.58955 2.65005 7.03242 3.09291L7.19481 3.25531C7.48615 3.54665 7.63182 3.69231 7.72706 3.8388C8.08622 4.3912 8.08622 5.10336 7.72706 5.65576C7.63182 5.80225 7.48615 5.94791 7.19481 6.23925C7.09955 6.33451 7.05192 6.38214 7.01206 6.43782C6.87038 6.63568 6.82146 6.92256 6.88957 7.15619C6.90873 7.22193 6.93367 7.27389 6.98356 7.37779Z" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                <a
                                                    href={`tel:${contact.phone}`}
                                                    className="font-['Suisse_Int\\'l'] text-sm font-[450] leading-5 tracking-[0.2px] text-[#475467]"
                                                >
                                                    {contact.phone}
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* More Button */}
                                {data.additionalContacts && data.additionalContacts.length > 0 && (
                                    <button
                                        onClick={() => setShowMoreContacts(!showMoreContacts)}
                                        className="flex items-center gap-1 font-['Suisse_Int\\'l'] text-sm font-semibold tracking-[0.2px] text-[#007AFF] uppercase"
                                    >
                                        {showMoreContacts ? 'Show Less' : `${data.additionalContacts.length} MORE`}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            className={cn(
                                                "transform transition-transform duration-200",
                                                showMoreContacts && "rotate-180"
                                            )}
                                        >
                                            <path d="M15.833 7.49967L9.99968 13.333L4.16634 7.49968" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export interface EditDetailsSectionProps {
    /** Section title */
    title?: string
    /** Custom class name for the container */
    className?: string
    /** Initial edit state */
    defaultIsEditing?: boolean
    /** Control edit state externally */
    isEditing?: boolean
    /** Callback when edit state changes */
    onEditChange?: (isEditing: boolean) => void
    /** Custom edit button */
    editButton?: ReactNode
    /** Custom expand button */
    expandButton?: ReactNode
    /** Children to render in the content area */
    children?: ReactNode
    /** Whether the section can be edited */
    editable?: boolean
    /** Whether the section can be expanded */
    expandable?: boolean
    /** Address data array */
    addresses?: AddressData[]
    /** Initial expand state */
    defaultExpanded?: boolean
    /** Control expanded state externally */
    isExpanded?: boolean
    /** Callback when expand state changes */
    onExpandChange?: (isExpanded: boolean) => void
}

export const EditDetailsSection = ({
    title = "Integrations",
    className,
    defaultIsEditing = false,
    isEditing: controlledIsEditing,
    onEditChange,
    editButton,
    expandButton,
    children,
    editable = true,
    expandable = true,
    addresses = defaultAddresses,
    defaultExpanded = true,
    isExpanded: controlledIsExpanded,
    onExpandChange,
}: EditDetailsSectionProps) => {
    const [isEditingInternal, setIsEditingInternal] = useState(defaultIsEditing)
    const [isExpandedInternal, setIsExpandedInternal] = useState(defaultExpanded)

    // Use controlled or uncontrolled states
    const isEditing = controlledIsEditing ?? isEditingInternal
    const isExpanded = controlledIsExpanded ?? isExpandedInternal

    const handleEditToggle = () => {
        const newState = !isEditing
        setIsEditingInternal(newState)
        onEditChange?.(newState)
    }

    const handleExpandToggle = () => {
        const newState = !isExpanded
        setIsExpandedInternal(newState)
        onExpandChange?.(newState)
    }

    const defaultExpandButton = (
        <button
            onClick={handleExpandToggle}
            className="ml-auto text-[#475467] hover:text-[#101828]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className={cn(
                    "transform transition-transform duration-200",
                    isExpanded ? "rotate-180" : ""
                )}
            >
                <path d="M19 9L12 16L5 9" stroke="#475467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </button>
    )

    return (
        <div className={cn("mt-6 w-full", className)}>
            {/* Addresses Header */}
            {title && <div className="flex h-16 px-6 items-center gap-6 rounded-xl bg-[#F7F9FE]">
                <h2 className="text-[28px] font-medium text-[#677281]">{title}</h2>
                {expandable && (
                    <div className="ml-auto">
                        {expandButton || defaultExpandButton}
                    </div>
                )}
            </div>}

            {/* Address Sections */}
            {isExpanded && (
                <div className="mt-1 flex flex-col gap-1">
                    {children || addresses.map((address, index) => (
                        <AddressSection
                            key={index}
                            data={address}
                            onEdit={editable ? handleEditToggle : undefined}
                            isEditing={isEditing}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default EditDetailsSection