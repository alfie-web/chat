import { useEffect } from 'react';

export default (ref, callback, permittedRef) => {
	// Вариан если бы был селектор
	// const handleOutsideClick = e => {
	// 	if ( ref.current && (!e.target.closest(selector) && !e.target.closest(permittedSelector) )) {
	// 		callback();
	// 	}
	// };

	const handleOutsideClick = e => {
		if ( ref.current && (!ref.current.contains(e.target) && !permittedRef.current.contains(e.target) )) {
			callback();
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleOutsideClick);

		return () => {
			document.removeEventListener("click", handleOutsideClick);
		};
	})
}