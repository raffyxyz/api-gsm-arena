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

    const name = $("div.review-header > div > div")
      .find(".specs-phone-name-title")
      .text();

    const cover = $("div.review-header > div > div > div.specs-photo-main > a")
      .find("img")
      .attr("src");

    const network = $("div#specs-list table")
      .first()
      .find("tr")
      .first()
      .find("td")
      .last()
      .find("a")
      .text();

    const launchTable = $("div#specs-list table:eq(1)");
    const announced = launchTable.find("td[data-spec='year']").text();
    const status = launchTable.find("td[data-spec='status']").text();

    const bodyTable = $("div#specs-list table:eq(2)");
    const dimension = bodyTable.find("td[data-spec='dimensions']").text();
    const weight = bodyTable.find("td[data-spec='weight']").text();
    const sim = bodyTable.find("td[data-spec='sim']").text();
    const other = bodyTable.find("td[data-spec='bodyother']").text();

    const displayTable = $("div#specs-list table:eq(3)");
    const type = displayTable.find("td[data-spec='displaytype']").text();
    const size = displayTable.find("td[data-spec='displaysize']").text();
    const resolution = displayTable
      .find("td[data-spec='displayresolution']")
      .text();
    const protection = displayTable
      .find("td[data-spec='displayprotection']")
      .text();
    const displayOther = displayTable
      .find("td[data-spec='displayother']")
      .text();

    const platformTable = $("div#specs-list table:eq(4)");
    const os = platformTable.find("td[data-spec='os']").text();
    const chipset = platformTable.find("td[data-spec='chipset']").text();
    const cpu = platformTable.find("td[data-spec='cpu']").text();
    const gpu = platformTable.find("td[data-spec='gpu']").text();

    const memoryTable = $("div#specs-list table:eq(5)");
    const card = memoryTable.find("td[data-spec='memoryslot']").text();
    const internal = memoryTable.find("td[data-spec='internalmemory']").text();
    const otherMemory = memoryTable.find("td[data-spec='memoryother']").text();

    const mainCameraTable = $("div#specs-list table:eq(6)");
    const mainModules = mainCameraTable
      .find("td[data-spec='cam1modules']")
      .text()
      .trim();
    const mainFeatures = mainCameraTable
      .find("td[data-spec='cam1features']")
      .text();
    const mainVideo = mainCameraTable.find("td[data-spec='cam1video']").text();

    const selfieCameraTable = $("div#specs-list table:eq(7)");
    const selfieModules = selfieCameraTable
      .find("td[data-spec='cam2modules']")
      .text()
      .trim();
    const selfieFeatures = selfieCameraTable
      .find("td[data-spec='cam2features']")
      .text();
    const selfieVideo = selfieCameraTable
      .find("td[data-spec='cam2video']")
      .text();

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
      name,
      cover,
      network,
      launced: { announced, status },
      body: { dimension, weight, sim, other },
      display: { type, size, resolution, protection, displayOther },
      platform: { os, chipset, cpu, gpu },
      memory: [
        {
          label: "card",
          value: card,
        },
        { label: "internal", value: internal },
        { label: "otherMemory", value: otherMemory },
      ],
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

export const scrapeImages = async (id: string) => {
  try {
    const imageDocument = await axios.get(`${GSM_ARENA}/${id}`);

    const $ = cheerio.load(imageDocument.data);

    // Select the first h2 element within the pictures-list class
    const firstH2 = $("#pictures-list h2").first();

    // Select all the img elements that come after the first h2
    const imagesAfterFirstH2 = firstH2.nextAll("img");

    // Extract the src attribute from each img element
    const imageLinks = imagesAfterFirstH2
      .map((index, element) => $(element).attr("src"))
      .get();

    return imageLinks;
  } catch (error) {
    console.log(error);
  }
};
