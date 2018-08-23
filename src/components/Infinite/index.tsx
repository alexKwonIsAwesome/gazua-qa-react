import * as React from 'react';
import styled from '../../styled-components';
import * as ReactDOM from 'react-dom';
import App from '../../views/App';

interface IProps {
  offset: number;
  loading: boolean;
  fetchedAll: boolean;
  onLoad: () => void;
}

interface IState {
  scrollHeight: number;
}

class Infinite extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,
    }
  }

  public componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
    this.setState({
      scrollHeight: document.querySelector('#root').scrollHeight,
    });
  }

  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  public onScroll = () => {
    const { offset, onLoad, loading, fetchedAll } = this.props;
    const { scrollHeight } = this.state;

    if (window.innerHeight + window.scrollY >= scrollHeight - offset && !loading && !fetchedAll) {
      onLoad();
    }
  }

  public render() {
    const { children, loading } = this.props;
    return (
      <Wrapper>
        {children}
        {loading && <Loading>로딩 중...</Loading>}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div``;

const Loading = styled.div`
  font-size: 1.4rem;
  text-align: center;
  margin: 5rem 0;
`;

export default Infinite;