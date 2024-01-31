import { useState, useEffect } from "react";
import i18n from '../../i18n'
import { useTranslation } from "react-i18next";

const LanguageDropDown = () => {
    const [selectedLang, setSelectedLang] = useState('en')
    // call the i18next and change the language

    const {t } = useTranslation()
    useEffect(() => {
        const currentLanguage = localStorage.getItem("I18N_LANGUAGE")
        setSelectedLang(currentLanguage)
    }, [])

    const handleLangChange = (e) => { 
        i18n.changeLanguage(e.target.value)
        localStorage.setItem("I18N_LANGUAGE", e.target.value)
        setSelectedLang(e.target.value)
    }
    return(
        <>
            <label>
                 Language:
            </label>
            <select onChange={handleLangChange}>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="es">Spanish</option>
                <option value="gr">German</option>
                <option value="rs">Russian</option>
            </select>
        </>
    )
};

export default LanguageDropDown