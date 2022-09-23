import {PageHeader} from "antd";
import Search from "antd/es/input/Search";
import {useSearchParams} from "react-router-dom";

const SearchField = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    return <Search
        defaultValue={searchParams.get("q")}
        placeholder="Search for movies"
        onSearch={(v) => {
            if(!v){
                searchParams.delete('q')
                setSearchParams(searchParams)
            }
            else{
                setSearchParams({["q"]: v})
            }
        }}/>
}

const Header = () => {
    return <PageHeader
        title={"Wookie Movies"}
        extra={<SearchField/>}
    />
}
export default Header;