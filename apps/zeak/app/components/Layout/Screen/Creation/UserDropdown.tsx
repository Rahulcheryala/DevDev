/**
 * UserDropdown Component
 *
 * The UserDropdown component provides a user-friendly interface for selecting users
 * from a list with search functionality. It allows users to filter through a list of
 * employees based on their first name, last name, or email address. The component
 * supports selecting and deselecting individual users, as well as selecting all users
 * at once.
 *
 * ## Props
 *
 * - `users: EmployeeUser[]`: An array of user objects to display in the dropdown.
 * - `selectedUsers: EmployeeUser[]`: An array of currently selected user objects.
 * - `onToggleUser: (user: EmployeeUser) => void`: Callback function called when a user
 *   is selected or deselected.
 * - `onSelectAll: () => void`: Callback function called when the "Select All" option
 *   is clicked.
 *
 *
 * ## Usage Example
 *
 *  <UserDropdown
 *    users={users}
 *    selectedUsers={selectedUsers}
 *    onToggleUser={handleToggleUser}
 *    onSelectAll={handleSelectAll}
 * />
 * 
 */

import React, { useState, useRef, useCallback, useMemo } from "react";
import { FaRegCircle } from "react-icons/fa";
import { IoCheckmarkCircle, IoSearchOutline } from "react-icons/io5";
import { Input } from "@zeak/react";
import { EmployeeUser } from "../../../types/employee-user.model";
import Image from "../../../Image";

interface UserDropdownProps {
    users: EmployeeUser[]; // List of users to display
    selectedUsers: EmployeeUser[]; // List of currently selected users
    onToggleUser: (user: EmployeeUser) => void; // Function to toggle user selection
    onSelectAll: () => void; // Function to select all users
}

const UserDropdown: React.FC<UserDropdownProps> = ({ users, selectedUsers, onToggleUser, onSelectAll }): JSX.Element => {
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for dropdown element

    // Function to filter users based on search term
    const filterUsers = useCallback((users: EmployeeUser[], searchTerm: string) => {
        return users.filter(
            (item) =>
                item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, []);

    const filteredItems = useMemo(() => filterUsers(users, searchTerm), [users, searchTerm]);

    // Toggle selection of a user
    const toggleItemSelection = (item: EmployeeUser) => {
        onToggleUser(item);
    };

    return (
        <div className="search relative" ref={dropdownRef}>
            {/* Input Field */}
            <div className="relative">
                <Input
                    id="search"
                    name="search"
                    placeholder="Enter name or email address"
                    className="bg-inputBg border-0 h-14 w-full p-2 rounded-md pl-10"
                    autoComplete=''
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IoSearchOutline className="absolute top-[32%] text-xl left-3 text-text-tertiary" />
            </div>
            {/* Dropdown */}
            <div className="rounded-md dropdown absolute min-h-[50px] max-h-[430px] w-full bg-white shadow-boxShadow-input border mt-1 overflow-y-auto z-10">

                    {filteredItems.length > 0 ? (
                        <>
                            <div className="flex items-center gap-3 px-6 pt-4 hover:bg-gray-100 cursor-pointer">
                                <span className='text-secondary-tertiary'>Results ({filteredItems.length})</span>
                            </div>
                            <div
                                className="flex items-center gap-4 px-6  hover:bg-gray-100 cursor-pointer"
                                onClick={onSelectAll}
                            >
                                {users.length === selectedUsers.length ?
                                        <IoCheckmarkCircle className="min-h-[24px] min-w-[24px] text-secondary-tertiary" /> :
                                        <FaRegCircle className="min-h-[24px] min-w-[24px] text-secondary-tertiary" />}
                                <div className='flex-1 pr-4 py-4 border-b'>
                                    <p className='text-accent-primary'>Select All</p>
                                </div>
                            </div>
                            {filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 px-6  hover:bg-gray-100 cursor-pointer"
                                    onClick={() => toggleItemSelection(item)}
                                >
                                    {!!selectedUsers.find((selected) => selected.id === item.id) ?
                                        <IoCheckmarkCircle className="min-h-[24px] min-w-[24px] text-secondary-tertiary" /> :
                                        <FaRegCircle className="min-h-[24px] min-w-[24px] text-secondary-tertiary" />}
                                    <div className="flex items-center py-4 gap-3 border-b w-full">
                                        <Image alt={item.firstName + item.lastName} className='min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full' />
                                        <div className='flex-1'>
                                            <p className='text-accent-dark truncate lg:max-w-[200px] md:max-w-[150px]'>{item.firstName} {item.lastName || ''}</p>
                                            <p className='text-secondary-tertiary truncate lg:max-w-[200px] md:max-w-[150px]'>{item.email}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="px-4 py-4 text-secondary-tertiary cursor-not-allowed">No results found</div>
                    )}
                </div>
        </div>
    );
};

export default UserDropdown;
