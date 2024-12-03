def convert_market_data_to_react(raw_data):
    # 分割原始數據為不同區域
    regions = raw_data.split('📌')[1:]  # 去掉第一個空字符串
    
    # 生成 React 組件代碼
    react_code = '''import React from 'react';
import './MarketEvent.css'

function MarketEvent() {
    return (
        <div>
            <div className='market-title'> 
                <img src="/images/marketTitle1.png" alt="Title Image" className="market-Titleimg" />
                <h1>市集內容</h1>
            </div>

            <div className='market-container1'>
                <img src="/images/1206.jpg" alt="Title Image" className="market-img" />
                <div className='market-context'>
'''

    # 處理每個區域
    for region in regions:
        lines = region.strip().split('\n')
        region_name = lines[0].strip()
        
        react_code += f'''                    <div className="market-section">
                        <h2>📌{region_name}📌</h2>
'''
        
        # 處理該區域的每個市集
        current_market = []
        for line in lines[1:]:
            line = line.strip()
            if line:
                if line.startswith('🏝️'):
                    if current_market:
                        # 生成前一個市集的 JSX
                        react_code += generate_market_item(current_market)
                    current_market = [line]
                else:
                    current_market.append(line)
        
        # 處理最後一個市集
        if current_market:
            react_code += generate_market_item(current_market)
        
        react_code += '                    </div>\n\n'

    # 添加組件的結尾部分
    react_code += '''                </div>
                <div className='market-space'></div>
            </div>
            
            <div className='market-title'> 
                <img src="/images/marketbow.png" alt="Title Image" className="market-Titleimg" />
            </div>
        </div>
    )
}

export default MarketEvent;'''

    return react_code

def generate_market_item(market_data):
    # 從市集數據中提取信息
    title = ''
    url = ''
    details = []
    
    for line in market_data:
        if line.startswith('🏝️'):
            title = line
        elif line.startswith('網址:'):
            url = line.replace('網址:', '').strip()
        else:
            if not line.startswith('網址:'):
                details.append(line)
    
    # 生成 JSX 代碼
    jsx = '''                        <div className="market-item">
                            <a href="{url}" target="_blank" rel="noopener noreferrer">{title}</a><br/>\n'''.format(url=url, title=title)

    # 添加詳細信息
    for detail in details:
        jsx += f'                            {detail}<br/>\n'

    jsx += '                        </div>\n\n'
    return jsx

# 使用示例
raw_data = """📌雙北📌
網址:
🏝️ 新北168幸福市集
📅 12.06~08 10:00-20:00
📍 新北市中和區中安街85號(國立臺灣圖書館前廣場)
網址:https://www.twmarket.tw/?p=51105
🏝️ ❤️冬之戀戀_ 南港CITYLINK❤️
📅 12.07~08 11:00 ～ 20:00 pm
📍 台北市南港𝗖𝗶𝘁𝘆𝗹𝗶𝗻𝗸 𝗔𝗕棟𝟭樓
網址:https://www.twmarket.tw/?p=51358
📌桃園📌
網址:
🏝️ 桃園中茂新天地幸福假日市集(萬聖節檔)
📅 12/06~08 11:00-20:30
📍 桃園市中茂新天地一樓犀牛廣場
網址:https://www.twmarket.tw/?p=51107
📌新竹📌
網址:
🏝️ 原風325 X 綠世界
📅 12/7 11:00 – 17:00
📍 新竹縣 綠世界生態農場
網址:https://www.twmarket.tw/?p=51512
🏝️ 🌸~日本散策市集 ~🌸
📅 12/7-8 11：00-20：00
📍 新竹市大遠百門口
網址:https://www.twmarket.tw/?p=51325
📌台中📌
網址:
🏝️ 飛爾市集 – 米平方音樂之市
📅 12/7 (六) 12:OO – 21:OO
12/8 (日) 12:OO – 2O:OO
📍 台中米平方商場 Msquare
網址:https://www.twmarket.tw/?p=51066
🏝️ 逢甲大學永續生活節市集
📅 12/06 - 12/07 14:00～20:00
📍 台中市西屯區文華路100號 (逢甲大學育樂館前走道)
網址:https://www.twmarket.tw/?p=50859
📌南投📌
網址:
🏝️ 作伙㱃咖啡活動
📅 12月7日(週六)晚上7:00~9:00
📍 南投市埔里鎮仁愛公園
網址:https://www.puli.gov.tw/Tag/PostDoc?ID=33461
📌臺南📌
網址:
🏝️ 2024年蕊丁布可．迺『冊』市
📅 12/07(sat.)｜14:00 – 20:00
12/08(sun.)｜14:00 – 19:00
📍 臺南市立圖書館新總館
網址:https://www.twmarket.tw/?p=51456
🏝️ 神農五八市集
📅 12月07~08日 週六：16:00~21:45
週日：16:00~21:15
📍 臺南市中西區神農街58-1號
網址:https://www.twmarket.tw/?p=51083
📌台南📌
網址:
🏝️ 萌寵嘉年華part1 X 趴兔市集
📅 12/7㊅-12/8㊐ 下午1點-晚上8點
📍 台南市新光三越中山店
網址:https://www.twmarket.tw/?p=51554
🏝️ 2024幸福台南．耶誕點燈
📅 12/7 14:00-20:00
📍 台南市民治市民廣場
網址:https://www.tainan.gov.tw/News_Content.aspx?n=13372&s=8707065#
📌高雄📌
網址:
🏝️ 🍻짠！下酒祭：音樂、啤酒、下酒菜 feat.韓國
📅 12/07(六) &12/08(日) 15:00-22:00
📍 高雄流行音樂中心 海風廣場
網址:https://kpmc.com.tw/program/2024-appetizers-120708/
🏝️ 2024鹹酥雞嘉年華｜逗陣，雄麻雞
📅 12/7㊅-12/8㊐ 15:00-21:00
📍 高雄大遠百追夢廣場
網址:https://khh.travel/zh-tw/event/calendardetail/6193/
🏝️ ▪️ 2024 高雄中藥文化生活節 x 中藥本草文化節 ▪️
📅 12/7㊅-12/8㊐ 13:30-21:00
📍 高雄駁二藝術特區｜大義區紅磚廊道
網址:https://pier2.org/activity/info/1481/
🏝️ SANPOOO 三波轉運站
📅 12/7㊅-12/8㊐14:00-20:00
📍 高雄駁二藝術特區｜大勇區P2倉庫暨駁遊路
網址:https://pier2.org/activity/info/1485/
🏝️ 弗金.森
📅 12/7㊅-12/8㊐ 13:00-20:00
📍 高雄駁二藝術特區｜蓬萊區戶外廣場

"""  # 您的完整市集數據

# 生成 React 組件代碼
react_component = convert_market_data_to_react(raw_data)

# 將生成的代碼保存到文件
with open('MarketEvent.txt', 'w', encoding='utf-8') as f:
    f.write(react_component)