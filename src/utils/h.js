const { innerWidth, innerHeight } = window;
const w = innerWidth * 0.95;
const h = innerHeight * 0.95;
const svg = d3
    .select(".container")
    .append("svg")
    .attr("height", h)
    .attr("width", w);

const margin = 10;
const width = w - 2 * margin;
const height = h - 2 * margin;
const outerRadius = Math.min(width, height) / 2
const g = svg
    .append("g")
    .attr(
        "transform",
        `translate(${margin + width / 2}, ${margin + height / 2})`
    );
const { sin, cos, PI } = Math
const theta = 3 * (PI / 2)
const innerRadius = outerRadius - 100

const data = [
    { "val": "", "text1": "In", "text2": "Jail", "color": "none", "icon": "👮" },
    { "val": "M120", "text1": "Connecticut", "text2": "Avenue", "color": "#aae0fa", "icon": "" },
    { "val": "M100", "text1": "Vermoont", "text2": "Avenue", "color": "#aae0fa", "icon": "" },
    { "val": "", "text1": "Chance", "text2": "", "color": "none", "icon": "❓" },
    { "val": "M100", "text1": "Oriental", "text2": "Avenue", "color": "#aae0fa", "icon": "" },
    { "val": "M200", "text1": "Reading", "text2": "Railroad", "color": "none", "icon": "🚂" },
    { "val": "Pay M200", "text1": "Income", "text2": "Tax", "color": "none", "icon": "" },
    { "val": "M60", "text1": "Baltic", "text2": "Avenue", "color": "#955436", "icon": "" },
    { "val": "", "text1": "Community", "text2": "Chest", "color": "none", "icon": "💰" },
    { "val": "M60", "text1": "Mediteranean", "text2": "Avenue", "color": "#955436", "icon": "" },
    { "val": "M200", "text1": "Collect", "text2": "Salary", "color": "none", "icon": "" },
    { "val": "M400", "text1": "Boardwalk", "text2": "", "color": "#0072bb", "icon": "" },
    { "val": "Pay M100", "text1": "Luxury", "text2": "Tax", "color": "none", "icon": "💎" },
    { "val": "M350", "text1": "Park", "text2": "Place", "color": "#0072bb", "icon": "" },
    { "val": "", "text1": "Chance", "text2": "", "color": "none", "icon": "❓" },
    { "val": "M200", "text1": "Short", "text2": "Line", "color": "none", "icon": "🚂" },
    { "val": "M320", "text1": "Pennsylvania", "text2": "Avenue", "color": "#1fb25a", "icon": "" },
    { "val": "", "text1": "Community", "text2": "Chest", "color": "none", "icon": "💰" },
    { "val": "M300", "text1": "North Carolina", "text2": "Avenue", "color": "#1fb25a", "icon": "" },
    { "val": "M300", "text1": "Pacific", "text2": "Avenue", "color": "#1fb25a", "icon": "" },
    { "val": "", "text1": "Go To", "text2": "Jail", "color": "none", "icon": "👮" },
    { "val": "M280", "text1": "Marvin", "text2": "Gardens", "color": "#fef200", "icon": "" },
    { "val": "M150", "text1": "Water", "text2": "Works", "color": "none", "icon": "💧" },
    { "val": "M260", "text1": "Ventnor", "text2": "Avenue", "color": "#fef200", "icon": "" },
    { "val": "M260", "text1": "Atlantic", "text2": "Avenue", "color": "#fef200", "icon": "" },
    { "val": "M200", "text1": "R & O", "text2": "Railroad", "color": "none", "icon": "🚂" },
    { "val": "M240", "text1": "Illinois", "text2": "Avenue", "color": "#ed1b24", "icon": "" },
    { "val": "M220", "text1": "Indiana", "text2": "Avenue", "color": "#ed1b24", "icon": "" },
    { "val": "", "text1": "Chance", "text2": "", "color": "none", "icon": "❓" },
    { "val": "M220", "text1": "Kentucky", "text2": "Avenue", "color": "#ed1b24", "icon": "" },
    { "val": "", "text1": "Free", "text2": "Parking", "color": "none", "icon": "🚗" },
    { "val": "M200", "text1": "New York", "text2": "Avenue", "color": "#f7941d", "icon": "" },
    { "val": "M180", "text1": "Tennessee", "text2": "Avenue", "color": "#f7941d", "icon": "" },
    { "val": "", "text1": "Community", "text2": "Chest", "color": "none", "icon": "💰" },
    { "val": "M180", "text1": "St James", "text2": "Place", "color": "#f7941d", "icon": "" },
    { "val": "M200", "text1": "Pennsylvania", "text2": "Railroad", "color": "none", "icon": "🚂" },
    { "val": "M160", "text1": "Virginia", "text2": "Avenue", "color": "#d93a96", "icon": "" },
    { "val": "M140", "text1": "States", "text2": "Avenue", "color": "#d93a96", "icon": "" },
    { "val": "M150", "text1": "Electric", "text2": "Company", "color": "none", "icon": "💡" },
    { "val": "M140", "text1": "St Charles", "text2": "Place", "color": "#d93a96", "icon": "" }
]
const pices = Array(data.length).fill(1)

const pie = d3.pie()
    .value(d => d)
const pieData = pie(pices)

const getPath = d => {
    const { startAngle, endAngle } = d
    const x1 = innerRadius * cos(startAngle + theta)
    const y1 = innerRadius * sin(startAngle + theta)
    const x2 = innerRadius * cos(endAngle + theta)
    const y2 = innerRadius * sin(endAngle + theta)
    return `M${x2},${y2}A${innerRadius},${innerRadius}, 1, 0,0, ${x1}, ${y1}`
}

const commonColor = "#000000aa"


pieData.forEach((item, index) => {
    g.append("path")
        .attr("id", `s${index}`)
        .attr("d", getPath(item))
        .attr("stroke", `${data[index].color}`)
        .style("stroke-width", "18px")
        .attr("fill", "none")

    g.append("text")
        .attr("dy", 25)
        .append("textPath")
        .attr("xlink:href", `#s${index}`)
        .text(`${data[index].text1}`)
        .attr("fill", commonColor)
        .style("text-anchor", "middle")
        .style("font-size", "8px")
        .attr("startOffset", "50%")

    g.append("text")
        .attr("dy", 35)
        .append("textPath")
        .attr("xlink:href", `#s${index}`)
        .text(`${data[index].text2}`)
        // .attr("fill", commonColor)
        .style("text-anchor", "middle")
        .style("font-size", "8px")
        .attr("startOffset", "50%")

    g.append("text")
        .attr("dy", 90)
        .append("textPath")
        .attr("xlink:href", `#s${index}`)
        .text(`${data[index].val}`)
        // .attr("fill", commonColor)
        .style("text-anchor", "middle")
        .style("font-size", "8px")
        .attr("startOffset", "50%")

    g.append("text")
        .attr("dy", 60)
        .append("textPath")
        .attr("xlink:href", `#s${index}`)
        .text(`${data[index].icon}`)
        .attr("fill", "#fff")
        .style("text-anchor", "middle")
        .style("font-size", "20px")
        .attr("startOffset", "50%")
})

g.selectAll('whatever')
    .data(pieData)
    .enter()
    .append('path')
    .attr('d', d3.arc()
        .innerRadius(outerRadius - 109)
        .outerRadius(outerRadius)
    )
    .attr('fill', 'none')
    .attr("stroke", commonColor)
    .style("stroke-width", "2px")
    .style("opacity", 0.7)



