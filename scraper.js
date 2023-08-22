
    async function extractValuesWithTeam() {
        const collectedData = [];

        for (let i = 1; i <= 100; i++) {
            for (let o = 1; o <= 20; o++) {
                const bookClosesSelector = `body > div > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div > div > div.wcl-PageContainer.wcl-PageContainer_State1.wcl-PageContainer-scrollable > div.wcl-PageContainer_Colcontainer > div > div > div.cm-CouponModule > div > div > div:nth-child(${i}) > div.gl-MarketGroup_Wrapper.suf-CompetitionMarketGroup_Wrapper > div > div.gl-Market_General-haslabels.suf-MarketFixtureDetailsLabel.gl-Market_General.gl-Market_General-topborder.gl-Market_General-pwidth47-21 > div:nth-child(${o}) > div.rcl-ParticipantFixtureDetails_LhsContainer > div > div.rcl-ParticipantFixtureDetails_Details > div.rcl-ParticipantFixtureDetails_BookCloses`;
                
                const teamSelector1 = `body > div > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div > div > div.wcl-PageContainer.wcl-PageContainer_State1.wcl-PageContainer-scrollable > div.wcl-PageContainer_Colcontainer > div > div > div.cm-CouponModule > div > div > div:nth-child(${i}) > div.gl-MarketGroup_Wrapper.suf-CompetitionMarketGroup_Wrapper > div > div.gl-Market_General-haslabels.suf-MarketFixtureDetailsLabel.gl-Market_General.gl-Market_General-topborder.gl-Market_General-pwidth47-21 > div:nth-child(${o}) > div.rcl-ParticipantFixtureDetails_LhsContainer > div > div.rcl-ParticipantFixtureDetails_TeamAndScoresContainer > div > div:nth-child(1) > div`;
                
                const teamSelector2 = `body > div > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div > div > div.wcl-PageContainer.wcl-PageContainer_State1.wcl-PageContainer-scrollable > div.wcl-PageContainer_Colcontainer > div > div > div.cm-CouponModule > div > div > div:nth-child(${i}) > div.gl-MarketGroup_Wrapper.suf-CompetitionMarketGroup_Wrapper > div > div.gl-Market_General-haslabels.suf-MarketFixtureDetailsLabel.gl-Market_General.gl-Market_General-topborder.gl-Market_General-pwidth47-21 > div:nth-child(${o}) > div.rcl-ParticipantFixtureDetails_LhsContainer > div > div.rcl-ParticipantFixtureDetails_TeamAndScoresContainer > div > div:nth-child(2) > div`;

                const oneSelector = `body > div > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div > div > div.wcl-PageContainer.wcl-PageContainer_State1.wcl-PageContainer-scrollable > div.wcl-PageContainer_Colcontainer > div > div > div.cm-CouponModule > div > div > div:nth-child(${i}) > div.gl-MarketGroup_Wrapper.suf-CompetitionMarketGroup_Wrapper > div > div:nth-child(2) > div:nth-child(${o}) > span`;
                const xSelector = `body > div > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div > div > div.wcl-PageContainer.wcl-PageContainer_State1.wcl-PageContainer-scrollable > div.wcl-PageContainer_Colcontainer > div > div > div.cm-CouponModule > div > div > div:nth-child(${i}) > div.gl-MarketGroup_Wrapper.suf-CompetitionMarketGroup_Wrapper > div > div:nth-child(3) > div:nth-child(${o}) > span`;
                const twoSelector = `body > div > div > div.wc-WebConsoleModule_SiteContainer > div.wc-PageView > div > div > div.wcl-PageContainer.wcl-PageContainer_State1.wcl-PageContainer-scrollable > div.wcl-PageContainer_Colcontainer > div > div > div.cm-CouponModule > div > div > div:nth-child(${i}) > div.gl-MarketGroup_Wrapper.suf-CompetitionMarketGroup_Wrapper > div > div:nth-child(4) > div:nth-child(${o}) > span`;

                const bookClosesElement = document.querySelector(bookClosesSelector);
                const teamElement1 = document.querySelector(teamSelector1);
                const teamElement2 = document.querySelector(teamSelector2);
                const oneElement = document.querySelector(oneSelector);
                const xElement = document.querySelector(xSelector);
                const twoElement = document.querySelector(twoSelector);

                if (bookClosesElement && teamElement1 && teamElement2 && oneElement && xElement && twoElement) {
                    if (bookClosesElement.classList.contains('rcl-ParticipantFixtureDetails_BookCloses')) {
                        const bookClosesValue = bookClosesElement.textContent.trim();
                        const teamValue1 = teamElement1.textContent.trim();
                        const teamValue2 = teamElement2.textContent.trim();
                        const oneValue = oneElement.textContent.trim();
                        const xValue = xElement.textContent.trim();
                        const twoValue = twoElement.textContent.trim();

                        collectedData.push({
                            date: bookClosesValue,
                            squadra1: teamValue1,
                            Squadra2: teamValue2,
                            '1': oneValue,
                            'X': xValue,
                            '2': twoValue,
                            'Bookmaker': 'Bet365'
                        });
                    }
                }
            }
        }

        return collectedData;
    }


///////////// SEND DATA 
    async function sendDataToServer(data) {
        const url = "http://127.0.0.1:5001/bet365";
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
//////////////////////////
    async function main() {
        let allData = [];

        const initialData = await extractValuesWithTeam();
        allData = allData.concat(initialData);


        const afterClickData = await extractValuesWithTeam();
        allData = allData.concat(afterClickData);

        const result = await sendDataToServer(allData);
        console.log(result);
    }

    main();
