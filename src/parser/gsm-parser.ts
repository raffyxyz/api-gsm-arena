import axios from "axios";
import cheerio from "cheerio";

import { PhoneInfo } from "types";
import { GSM_ARENA, SEARCH_PARAMS } from "../../config";

export const scrapeSearch = async (query: string, list: PhoneInfo[] = []) => {
  try {
    const searchDocument = await axios.get(
      `${GSM_ARENA}/${SEARCH_PARAMS}=${query}`
    );

    const $ = cheerio.load(searchDocument.data);

    $("div#review-body > .makers > ul > li").each((_i, el) => {
      list.push({
        id: $(el).find("a").attr("href"),
        name: $(el)
          .find("a > strong > span")
          .contents()
          .map(function () {
            if (this.type === "text") {
              return $(this).text();
            } else if (this.tagName === "br") {
              return " ";
            }
          })
          .get()
          .join(""),
        image: $(el).find("a > img").attr("src"),
      });
    });

    return list;
  } catch (error) {
    console.log(error);
  }
};

export const scrapeInfo = async (id: string) => {
  try {
    const infoDocument = await axios.get(`${GSM_ARENA}/${id}`);

    const $ = cheerio.load(infoDocument.data);

    // $("div#specs-list > table").each((_i, el) => {});

    const network = $("div#specs-list table")
      .first()
      .find("tr")
      .first()
      .find("td")
      .last()
      .find("a")
      .text();

    const secondTable = $("div#specs-list table:eq(1)");
    const announced = secondTable.find("td[data-spec='year']").text();
    const status = secondTable.find("td[data-spec='status']").text();

    const thirdTable = $("div#specs-list table:eq(2)");
    const dimension = thirdTable.find("td[data-spec='dimensions']").text();
    const weight = thirdTable.find("td[data-spec='weight']").text();
    const sim = thirdTable.find("td[data-spec='sim']").text();
    const other = thirdTable.find("td[data-spec='bodyother']").text();

    const fourthTable = $("div#specs-list table:eq(3)");
    const type = fourthTable.find("td[data-spec='displaytype']").text();
    const size = fourthTable.find("td[data-spec='displaysize']").text();
    const resolution = fourthTable
      .find("td[data-spec='displayresolution']")
      .text();
    const protection = fourthTable
      .find("td[data-spec='displayprotection']")
      .text();
    const displayOther = fourthTable
      .find("td[data-spec='displayother']")
      .text();

    const fifthTable = $("div#specs-list table:eq(4)");
    const os = fifthTable.find("td[data-spec='os']").text();
    const chipset = fifthTable.find("td[data-spec='chipset']").text();
    const cpu = fifthTable.find("td[data-spec='cpu']").text();
    const gpu = fifthTable.find("td[data-spec='gpu']").text();

    const sixthTable = $("div#specs-list table:eq(5)");
    const card = sixthTable.find("td[data-spec='memoryslot']").text();
    const internal = sixthTable.find("td[data-spec='internalmemory']").text();
    const otherMemory = sixthTable.find("td[data-spec='memoryother']").text();

    const seventhTable = $("div#specs-list table:eq(6)");
    const mainModules = seventhTable
      .find("td[data-spec='cam1modules']")
      .text()
      .trim();
    const mainFeatures = seventhTable
      .find("td[data-spec='cam1features']")
      .text();
    const mainVideo = seventhTable.find("td[data-spec='cam1video']").text();

    const eightTable = $("div#specs-list table:eq(7)");
    const selfieModules = eightTable
      .find("td[data-spec='cam2modules']")
      .text()
      .trim();
    const selfieFeatures = eightTable
      .find("td[data-spec='cam2features']")
      .text();
    const selfieVideo = eightTable.find("td[data-spec='cam2video']").text();

    const soundTable = $("div#specs-list table:eq(8)");
    const loudSpeaker = soundTable.find("tr:eq(0) td.nfo").text().trim();
    const audioJack = soundTable.find("tr:eq(1) td.nfo").text();
    const otherSound = soundTable.find("td[data-spec='optionalother']").text();

    const commsTable = $("div#specs-list table:eq(9)");
    const wlan = commsTable.find("td[data-spec='wlan']").text();
    const bluetooth = commsTable.find("td[data-spec='bluetooth']").text();
    const gps = commsTable.find("td[data-spec='gps']").text();
    const nfc = commsTable.find("td[data-spec='nfc']").text();
    const infrared = commsTable.find("tr:eq(4) td.nfo").text();
    const radio = commsTable.find("td[data-spec='radio']").text();
    const usb = commsTable.find("td[data-spec='usb']").text();

    const featuresTable = $("div#specs-list table:eq(10)");
    const sensors = featuresTable.find("td[data-spec='sensors']").text();

    const batteryTable = $("div#specs-list table:eq(11)");
    const battType = batteryTable
      .find("td[data-spec='batdescription1']")
      .text();
    const charging = batteryTable.find("tr:eq(1) td.nfo").text();

    const miscTable = $("div#specs-list table:eq(12)");
    const colors = miscTable.find("td[data-spec='colors']").text();
    const models = miscTable.find("td[data-spec='models']").text();

    return {
      network,
      launced: { announced, status },
      body: { dimension, weight, sim, other },
      display: { type, size, resolution, protection, displayOther },
      platform: { os, chipset, cpu, gpu },
      memory: {
        card,
        internal,
        otherMemory,
      },
      mainCamera: {
        mainModules,
        mainFeatures,
        mainVideo,
      },
      selfieCamera: {
        selfieModules,
        selfieFeatures,
        selfieVideo,
      },
      sound: {
        loudSpeaker,
        audioJack,
        otherSound,
      },
      comms: {
        wlan,
        bluetooth,
        gps,
        nfc,
        infrared,
        radio,
        usb,
      },
      sensors,
      battery: {
        battType,
        charging,
      },
      misc: {
        colors,
        models,
      },
    };
  } catch (error) {
    console.log(error);
  }
};
