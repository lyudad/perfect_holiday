import styled from 'styled-components';

const SidebarBlock = styled.div`
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    width: 200px;
    height: 300px;
    padding: 5px;
`;

const SidebarUl = styled.ul`
    display: flex;
    flex-flow: column;
    /* justify-content: space-between; */
    height: 100%;

    margin: 0px;
    padding: 0px;
`;

const SidebarLi = styled.li`
    list-style-type: none;
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    background: #f5f5f5;
    margin-bottom: 5px;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 18px;

    :last-child {
        margin-bottom: 0px;
    }

    :hover {
        background: #d9d9d9;
    }
`;

export {
    SidebarBlock,
    SidebarUl,
    SidebarLi
}