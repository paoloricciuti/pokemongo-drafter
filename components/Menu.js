import React, { useState } from 'react';
import Link from 'next/link'

const Menu = props => {
    const [open, setOpen] = useState(false);
    return (
        <div onClick={() => { setOpen(prev => !prev) }} className="articlesWrapper">
            <div className={`articles ${open ? "openArticles": ""}`}>
                <i className="material-icons menu-icon">{props.icon}</i>
                <Link href={props.href}>
                    <a>{props.name}</a>            
                </Link>
            </div>
        </div>
    )
};

export default Menu;