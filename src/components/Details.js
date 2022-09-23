import {Divider, Drawer, Rate, Space, Tag} from "antd";

const Details = ({data, open, close}) => {
    if (!data) return <></>
    return <Drawer key={data.id + "_drawer"} title="Details" placement="right" onClose={close} open={open}>
        <Space direction={"vertical"}>
            <h1>{data.title}</h1>
            {data.imdb_rating || data.imdb_rating === 0 ?
                <Rate disabled defaultValue={data.imdb_rating} allowHalf count={10}/> :
                <p>No Rating</p>
            }
            <Space wrap>
                <Tag color={"#414040"}> {data.released_on.slice(0, 4)} </Tag>
                <Tag color={"#414040"}> {data.length} </Tag>
            </Space>
            <Space wrap>
                {(typeof data.director === "string" ? [data.director] : data.director).map(c => <Tag
                    color={"grey"} key={c}>{c}</Tag>)} </Space>
            <Space wrap>
                {data.cast.map(c => <Tag key={c}>{c}</Tag>)}
            </Space>
            <Divider/>
            <p>{data.overview}</p>
        </Space>
    </Drawer>
}
export default Details;
