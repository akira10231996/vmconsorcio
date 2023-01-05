import { useEffect, useState } from "react"

const useDarkMode = () => {
    const [isDark, setIsDark] = useState(document.body.classList.contains("dark"))
    useEffect(() => {
        var observer = new MutationObserver(function (event) {
            setIsDark(document.body.classList.contains("dark"))
          })
          
          observer.observe(document.body, {
            attributes: true, 
            attributeFilter: ['class'],
            childList: false, 
            characterData: false
          })
    }, [])
    return isDark
}

export default useDarkMode