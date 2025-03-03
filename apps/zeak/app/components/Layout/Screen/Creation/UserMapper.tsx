/**
 * UserMapper Component
 * 
 * This component allows users to select and display a list of users.
 * 
 * Props:
 * - selectedUsers: An array of EmployeeUser objects representing the currently selected users.
 * - onToggleUser: A function that takes an EmployeeUser object as an argument and toggles the user's selection.
 * 
 * Usage:
 * 
 * <UserMapper 
 *     selectedUsers={arrayOfSelectedUsers} 
 *     onToggleUser={handleToggleUser} 
 * />
 */


import { IoCloseOutline } from 'react-icons/io5'
import UserDropdown from './UserDropdown'
import Image from '../../../Image';
import { EmployeeUser } from '../../../types/employee-user.model';

interface UserMapperProps {
    users: EmployeeUser[]; // List of users to display
    selectedUsers: EmployeeUser[]; // List of currently selected users
    onToggleUser: (user: EmployeeUser) => void; // Function to toggle user selection
    onSelectAll: () => void; // Function to select all users
}

const UserMapper: React.FC<UserMapperProps> = ({ users, selectedUsers, onToggleUser, onSelectAll }) : JSX.Element => {
    return (
        <div className='flex h-full'>
            <div className="left-col lg:w-[50%] md:w-[60%] px-10 py-8">
                <p className='text-secondary text-sm font-semibold mb-3'>Select one or more users to add to the team</p>
                <UserDropdown
                    users={users}
                    selectedUsers={selectedUsers}
                    onToggleUser={onToggleUser}
                    onSelectAll={onSelectAll}
                />
            </div>
            <div className="right-col bg-inputBg lg:w-[50%] md:w-[40%] px-10 py-8 pr-0">
                <p className='text-secondary text-sm font-semibold mb-4'>Users Added ({selectedUsers.length})</p>
                <div className="selected-user-list h-[calc(100vh-200px)] overflow-auto pr-8 pb-20">
                    {selectedUsers.map((user) => <div
                        key={user?.id}
                        className="user-item flex gap-2 mb-4 items-center bg-accent-darkYellowShade1 p-4 rounded-[12px]">
                        <Image alt={user.firstName + user.lastName} className='min-h-[40px] min-w-[40px] h-[40px] w-[40px] rounded-full' />
                        <div className='flex-1'>
                            <p className='text-accent-dark truncate'> {user.firstName} {user.lastName || ''} </p>
                            <p className='text-secondary-tertiary truncate lg:max-w-[200px] md:max-w-[150px]'>
                                {user.email}
                            </p>
                        </div>
                        <IoCloseOutline className='text-xl text-text-tertiary' onClick={() => onToggleUser(user)} />
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default UserMapper
