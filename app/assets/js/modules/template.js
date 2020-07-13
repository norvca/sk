function template(arr) {
  const newArr = arr.map(e => {
    const turnOverRateAdd = e.f10;
    const increaseRate = e.f3;
    const area = e.f13;
    const stockCode = e.f12;

    return `<tr class="hover-bg-washed-green ">
            <td class="pv2  bt br b--black-20 mid-gray">${
              arr.indexOf(e) + 1
            }</td>

            ${
              e.bk
                ? `<td class="x-bk pv2  bt br b--black-20 mid-gray">${e.bk}</td>`
                : `<td class="x-bk pv2  bt br b--black-20 mid-gray">-</td>`
            }
            
            ${
              area == 0
                ? `<td class="pv2  bt br b--black-20 mid-gray"><a target="_blank" class="no-underline blue" href="https://xueqiu.com/S/SZ${stockCode}">${e.f14}</a></td>`
                : `<td class="pv2  bt br b--black-20 mid-gray"><a target="_blank" class="no-underline blue" href="https://xueqiu.com/S/SH${stockCode}">${e.f14}</a></td>`
            }
            <td class="pv2  bt br b--black-20 mid-gray">${e.f2}</td>
            ${
              increaseRate >= 0
                ? `<td class="pv2  bt br b--black-20 red">${e.f3}%</td>`
                : `<td class="pv2  bt br b--black-20 green">${e.f3}%</td>`
            }
            <td class="pv2  bt br b--black-20 mid-gray">${e.f17}</td>
            <td class="pv2  bt br b--black-20 mid-gray">${e.f18}</td>
            <td class="pv2  bt br b--black-20 mid-gray">${e.f8}</td>
            ${
              turnOverRateAdd >= 0
                ? `<td class="pv2 pr3 bt b--black-20 red">${turnOverRateAdd}%</td>`
                : `<td class="pv2 pr3 bt b--black-20  green">${turnOverRateAdd}%</td>`
            }
            
          </tr>`;
  });

  const result = newArr.join('\n');
  return result;
}

export default template;
