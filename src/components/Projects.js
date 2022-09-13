import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
// import { arc, pie, select } from 'd3'
import { state } from '../utils/state'
import { useSnapshot } from 'valtio'
import { Link } from 'react-router-dom'
import Tilt from 'react-tilt'
import { handleMousemove } from '../utils/scroll'


function Project({ project }) {
    const snap = useSnapshot(state);
    if (snap.mobile) {
        return (<Card to={`/${project.id}`}>
            <img src={`${project.image}`} />
            <div className='title'>{project.project_name}</div>
            <div>{project.date}</div>
            <div>{project.description}</div>
        </Card>)
    } else {
        return (<Tilt
            options={{ reset: false, easing: "cubic-bezier(0.03,0.98,0.52,0.99)", }}
            style={{ height: '100%' }}
        >
            <Card to={`/${project.id}`}>
                <img src={`${project.image}`} />
                <div className='title'>{project.project_name}</div>
                <div>{project.date}</div>
                <div>{project.description}</div>
            </Card>
        </Tilt>)
    }

}

function Projects() {
    const snap = useSnapshot(state);
    const CardsScroll = useRef(null);
    // let svg;
    // useEffect(() => {
    //     const { innerWidth, innerHeight } = window;
    //     const w = snap.mobile ? (innerWidth * 2) : (innerWidth * 0.95);
    //     const h = innerHeight * 0.95;
    //     svg = select(".CardsScroll")
    //         .append("svg")
    //         .attr("height", "100%")
    //         .attr("width", "100%");

    //     const width = w - 20;
    //     const height = h - 20;
    //     const outerRadius = Math.min(width, height) / 2;
    //     const g = svg
    //         .append("g")
    //         .attr("transform", snap.mobile ?
    //             `translate(${(width / 2) / 2}, ${(height / 2)})` :
    //             `translate(${10 + width / 2}, ${10 + height / 2})`)
    //     const { sin, cos, PI } = Math;
    //     const theta = 3 * (PI / 2);
    //     const innerRadius = outerRadius - 300;

    //     const pices = Array(snap.data.length).fill(1);
    //     const poi = pie().value(d => d);
    //     const pieData = poi(pices);

    //     const getPath = d => {
    //         const { startAngle, endAngle } = d
    //         const x1 = innerRadius * cos(startAngle + theta)
    //         const y1 = innerRadius * sin(startAngle + theta)
    //         const x2 = innerRadius * cos(endAngle + theta)
    //         const y2 = innerRadius * sin(endAngle + theta)
    //         return `M${x2},${y2}A${innerRadius},${innerRadius}, 1, 0,0, ${x1}, ${y1}`
    //     };

    //     const commonColor = "var(--blue)";

    //     pieData.forEach((item, index) => {
    //         g.append("path")
    //             .attr("id", `s${index}`)
    //             .attr("d", getPath(item))
    //             .attr("stroke", `${snap.data[index].project_name}`)
    //             .style("stroke-width", "18px")
    //             .attr("fill", "none")

    //         g.append("text")
    //             .attr("dy", 200)
    //             .append("textPath")
    //             .attr("xlink:href", `#s${index}`)
    //             .text(`${snap.data[index].date}`)
    //             .attr("fill", commonColor)
    //             .style("text-anchor", "middle")
    //             .style("font-size", "8px")
    //             .attr("startOffset", "50%")

    //         g.append("text")
    //             .attr("dy", 35)
    //             .append("textPath")
    //             .attr("xlink:href", `#s${index}`)
    //             .text(`${snap.data[index].description}`)
    //             .attr("fill", commonColor)
    //             .style("text-anchor", "middle")
    //             .style("font-size", "8px")
    //             .attr("startOffset", "50%")

    //         g.append("text")
    //             .attr("dy", 90)
    //             .append("textPath")
    //             .attr("xlink:href", `#s${index}`)
    //             // .text(`${data[index].val}`)
    //             .attr("fill", commonColor)
    //             .style("text-anchor", "middle")
    //             .style("font-size", "8px")
    //             .attr("startOffset", "50%")

    //         g.append("text")
    //             .attr("dy", 60)
    //             .append("textPath")
    //             .attr("xlink:href", `#s${index}`)
    //             // .text(`${data[index].icon}`)
    //             .attr("fill", "#fff")
    //             .style("text-anchor", "middle")
    //             .style("font-size", "20px")
    //             .attr("startOffset", "50%")
    //     });

    //     g.selectAll('whatever')
    //         .data(pieData)
    //         .enter()
    //         .append('path')
    //         .attr('d', arc()
    //             .innerRadius(outerRadius - 109)
    //             .outerRadius(outerRadius)
    //         )
    //         .attr('fill', 'none')
    //         .attr("stroke", commonColor)
    //         .style("stroke-width", "1px")
    //         .style("opacity", 1);

    //     return () => {
    //         // select(".CardsScroll").remove();
    //     }
    // }, [])

    useEffect(() => {
        !snap.mobile && CardsScroll.current.addEventListener("mousemove", handleMousemove, false);
    }, [])

    return (<CardScroller
        ref={CardsScroll}
        className='CardsScroll'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.23 }}
    >
        <CardWrapper>
            {snap.data.map((project, key) => (
                <Project project={project} key={key} />
            ))}
        </CardWrapper>
    </CardScroller>)
}

export default Projects

const CardScroller = styled(motion.div)`
    /* overflow-x: scroll; */
    /* width: 100%; */
    height: 100%;
    margin: auto 0;
    display: block;
`
const CardWrapper = styled.div`
    /* width: max-content; */
    height: 100%;
    transition: 0.3s;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    /* column-gap: 10px; */
    padding: 100px 0;
    width: fit-content;
    @media screen and (max-width: 768px) {
        padding: 0;
        align-items: center;
    }
`
const Card = styled(Link)`
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1.5fr 0.25fr 0.25fr 1fr ;
    width: 95vw;
    height: 100%;
    background-color: transparent;
    color: var(--black);
    /* background-color: var(--blue); */
    /* color: var(--offwhite); */
    overflow: hidden;
    text-decoration: none;

    @media screen and (min-width: 768px) {
        width: 45vw;
    }

    &:hover{
        opacity: 0.75;
    }

    div{
        padding: 0 10px;
    }
    & img{
        overflow: hidden;
        /* position: absolute;
        left: 50%;
        transform: translateX(-50%); */
        height: auto;
        width: 100%;
    }
    /* transform: perspective(500px);  */
`