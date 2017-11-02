$("head").append("<script id='unbias-pronounBannerTmpl' type='text/x-tmpl-mustache'></script>");
var bannerTemplateURL = chrome.extension.getURL("templates/pronounBanner.mustache");
console.log(bannerTemplateURL);


$("head #unbias-pronounBannerTmpl").load(bannerTemplateURL, function(){
    var bannerTemplate = $("head #unbias-pronounBannerTmpl").html();
    var pronounData = wikiPage.getPronounDataAsArray();
    console.log({pronounCounts: pronounData});

    var renderedData = Mustache.render(bannerTemplate, {pronounCounts: pronounData});
    console.log(renderedData);

    $("#bodyContent").prepend(renderedData);
});
