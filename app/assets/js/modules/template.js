function template(arr) {
  const newArr = arr.map(e => {
    const turnOverRateAdd = e.turnOverRateAdd;
    const increaseRate = e.f3;
    const area = e.f13;
    const stockCode = e.f12;
    const companyPrice = (e.f20 / 100000000).toFixed(1);
    const province = e.f102.substr(0, 2);

    return `<tr class="hover-bg-washed-green ">
            <td class="pv2  bt br b--black-20 mid-gray">${
              arr.indexOf(e) + 1
            }</td>

            ${
              e.bk
                ? `<td class="x-bk pv2  bt br b--black-20 mid-gray">${e.bk}</td>`
                : `<td class="x-bk pv2  bt br b--black-20 mid-gray">-</td>`
            }
            
            <td class="pv2  bt br b--black-20 mid-gray">${province}</td>

            ${
              area == 0
                ? `<td class="pv2  bt br b--black-20 mid-gray"><a target="_blank" class="no-underline blue" href="https://xueqiu.com/S/SZ${stockCode}">${e.f14}</a></td>`
                : `<td class="pv2  bt br b--black-20 mid-gray"><a target="_blank" class="no-underline blue" href="https://xueqiu.com/S/SH${stockCode}">${e.f14}</a></td>`
            }

            ${
              companyPrice < 200
                ? `<td class="pv2  bt br b--black-20 mid-gray">${companyPrice}亿</td>`
                : `<td class="pv2  bt br b--black-20 silver">${companyPrice}亿</td>`
            }

            <td class="pv2  bt br b--black-20 mid-gray">${e.f2}</td>
            ${
              increaseRate >= 0
                ? `<td class="pv2  bt br b--black-20 red">${e.f3}%</td>`
                : `<td class="pv2  bt br b--black-20 green">${e.f3}%</td>`
            }
            <td class="pv2  bt br b--black-20 mid-gray">${e.f10}</td>
            <td class="pv2  bt br b--black-20 mid-gray">${e.f8}%</td>
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
