import React from 'react'
import { useContext } from "react"
import '../assets/SideFilter.css'
import CategoryContext from '../Context/CategoryContext'
import { Link } from 'react-router-dom'


const Categories = () => {

    const { categories, setCategories } = useContext(CategoryContext)
    return (
        <div className={'side-filter-wrapper'}>
            <div className={'side-filter-element'}>
                <div className={'filter-element-header'}>
                    CATEGORIES
                </div>
                <div className={'filter-option-wrapper'}>
                    {
                        categories.map((category) => (
                            <div key={category.id} className={'filter-option'}>
                                <Link className={'filter-option'}
                                    to={{
                                        pathname: '/products/' + category.id,
                                        state: { stateParam: true }
                                    }}
                                >
                                    {category.name}
                                </Link>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>
    )
}
export default Categories
