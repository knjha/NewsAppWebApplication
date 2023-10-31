import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import Loading from "../Loading/Loading";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";

function News(props) {
  const { newscategory} = props;
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const capitaLizeFull = (string) => {  
    return string.toUpperCase();
  };


  const category = newscategory;
  const title = capitaLize(category);
  document.title = `${capitaLize(title)} - News`;
  const categoryFull = capitaLizeFull(category);
  
  const updatenews = async () => {
    try {
      const response = await axios.get(endpointPath(categoryFull));
      if (response.status === 200) {
        setLoading(true);
        const parsedData = response.data;
        console.log(parsedData);
        setAttributes(parsedData.data);
        setLoading(false);
      } else {
        console.error(`API request failed with status code: ${response.status}`);
      }  
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    updatenews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header>{header(capitaLize(category))}</Header>
          <Container>
            <Row>
              {attributes && attributes.length > 0 ? (
                attributes
                  .filter((element) => element.attributes.category === categoryFull || 'HOME' === categoryFull || 'GENERAL' === categoryFull)
                  .map((element) => {
                    console.log(element);
                    return (
                      <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                        <NewsItem
                          title={element.attributes.headline}
                          description={element.attributes.hashtags}
                          channel={element.attributes.newsSource}
                          alt="News image"
                          imageUrl={element.attributes.image ? NullImage : element.attributes.newsIcon}
                        />
                      </Col>
                    );
                  })
              ) : (
                <p>No sports articles available.</p>
              )}
            </Row>
          </Container>
        </>
      )}
    </>
  );
  
}

News.defaultProps = {
  newscategory: "general",
};

News.propTypes = {
  newscategory: PropTypes.string,
};

export default News;
