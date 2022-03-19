import { useEffect, useState } from 'react';
// import { BiArrowFromBottom } from 'react-icons/bi';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
            console.log("Offset :" , window.pageYOffset);
        } else {
            setIsVisible(false);
            console.log("Offset :" , window.pageYOffset);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className='fixed'>
            <Button
                type='button'
                variant="secondary"
                onClick={scrollToTop}
                className="table-load-btn mt-3 mb-4 fixed"
            >
                Move to the top
            </Button>
        </div>
    );
};

export default ScrollToTop;