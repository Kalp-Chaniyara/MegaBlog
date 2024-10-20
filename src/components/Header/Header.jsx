import React from 'react'
import { Container, Logo, LogOutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    //Just need to add one value in the object and it added in the navigation bar, if we do it seperately then for every button added we have to add it
    const navItems = [
        {
            name: "Home",
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    return (
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav className='flex'>
                    <div>
                        <Link to='/'>
                            <Logo width='70px' />
                        </Link>
                    </div>
                    <div>
                        <ul className='flex ml-auto'>
                            {navItems.map((item) => (
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)} // Here as {} is not there arrow function implicitly returns it but navigate function is not return anything so arrow function returns undefined but onclick event doesn't eventually care about the return value fro the function we pass
                                            className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                        >{item.name}
                                        </button>
                                    </li>
                                ) : null
                            ))}
                            {authStatus && (
                                <li>
                                    <LogOutBtn />
                                </li>
                            )}
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header
