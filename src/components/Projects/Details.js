
import { useState } from 'react';
import styled from 'styled-components';
import { convertDate } from '../../utils/common'
import { Arrow } from '../../utils/svg'

export default function Details({ project }) {
    const [hide, setHide] = useState(false);

    return <DetailsWrapper height={!hide ? '35%' : 'min-content'}>
    <div className='details'>
        <div onClick={() => setHide(!hide)} className='title'>
            <h1 >{project.name}</h1>
            <Arrow hide={hide} />
        </div>
        {!hide && <div className='caption'>
            <p style={{ fontVariantCaps: "all-small-caps" }}>{convertDate(project.date)}</p>
            {project.url !== '' && <a href={project.url} target='_blank' rel='noreferrer'>{project.url.replace(/(^\w+:|^)\/\//, '')}</a>}
        </div>}
    </div>
    {!hide && <p className='desc'>{project.description}</p>}
</DetailsWrapper>
}

const DetailsWrapper = styled.div`
        position: fixed;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    row-gap: 15px;
        height: min-content;
        background-color: var(--bgSecondary);

    .details{
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 5px;
    }
    .title{
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 10px;
        width: 100%;
        justify-content: space-between;
    }
    .caption{
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        width: 100%;
        flex-wrap: wrap;
    }
    .desc{
        white-space: pre-line;
        overflow-y: scroll;
        height: 200px;
        background-color: var(--bgPrimary);
        padding: 10px;
    }

    a{
        font-weight: 700;
        padding: 4px 6px;
        color: var(--white) !important;
        background-color: var(--blue) !important;

        &:hover{
            color: var(--blue) !important;
            background-color: var(--white) !important;
        }
    }

    @media screen and (min-width: 768px) {
        bottom: 10px;
        margin-top: 20px;
        padding: 15px;
        left: 50%;
        transform: translateX(-50%);
        width: 65ch;

        .title:hover > div svg {
            fill: var(--blue);
        }
    }

    @media screen and (max-width: 768px) {
        bottom: 0px;
        padding: 10px;
        width: 100vw;
        h1{
            font-size: 1.3rem;
        }
        .desc{
            height: 35vh;
        }
    }
`