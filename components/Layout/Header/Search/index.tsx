import styles from "./style.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  return (
    <>
      <div className={styles.header_search_button}>
        <FontAwesomeIcon icon={faSearch} size="1x" color="#3270FC" />
        <span>جستجو...</span>
      </div>
    </>
  );
};

export default Search;
