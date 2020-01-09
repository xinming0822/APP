$(document).ready(function() {
	var init_present_location_YN = 1;  //get present location city and weather when APP initiates default, 0: No, 1: Yes
	// console.log(init_present_location_YN);
    //選擇縣市 select city button function .btn_city_select
    $(".btn_city_select").click(function(){
		var city_select = $(this).text();
		getTaiwanWeather(city_select);
        $(".collapse").collapse("hide");  // hide collapse 收起
		
    });
	
	function getTaiwanWeather(city_name) {
		//Weather Forecast Open Data API
		var Your_Weather_API_key = "CWB-EB79423D-6EC3-4478-B19D-252F51125BC2";  //IMPORTANT, replace it with your weather API Authkey 中央氣象局授權碼
		//中央氣象局 F-C0032-001 一般天氣預報-今明 36 小時天氣預報資料 API 全部縣市
		var url_all = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0053-031?Authorization=" + Your_Weather_API_key + "&format=JSON";
		//中央氣象局 F-C0032-001 一般天氣預報-今明 36 小時天氣預報資料 API by 縣市
		var url_city = "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-B0053-031?Authorization=" + Your_Weather_API_key + "&format=JSON&locationName=";
		
		
		var jqxhr = $.getJSON(url_city + city_name, function() {
			console.log("Get Taiwan weather success.");
		}).done(function(arr) {
			var test=city(city_name);
			function city(city_name){
				if ( city_name =="中央尖山" ) {
					return test =0;
				}
				else if ( city_name=="巴巴山" ) {
					return test =1;
				}
				else if ( city_name=="南湖大山" ) {
					return test =2;
				}
				else if ( city_name=="南湖大山南峰" ) {
					return test =3;
				}
				else if ( city_name=="雪山北峰" ) {
					return test =4;
				}
				else if ( city_name=="雪山東峰" ) {
					return test =5;
				}
				else {
					
				}
			}
			
			// 時間
			// var outStr = JSON.stringify(arr);
			// console.log(outStr);
			// console.log(arr.cwbopendata.dataset.locations.location[0]);
			var time_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[0].startTime.substr(5,5).replace("-","/");
			var time_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[1].startTime.substr(5,5).replace("-","/");
			var time_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[2].startTime.substr(5,5).replace("-","/");
			//主時間 Day 2, 3, 4 時間資料 #date, #day2, day3, day4
			$("#city").text(city_name);
			$("#date").text(time_1.substr(0,5));
			$("#day2").text(time_1);
			$("#day3").text(time_2);
			$("#day4").text(time_3);
			
			
			//天氣概況 #weather-description
			// console.log(arr.cwbopendata.dataset.locations.location[0].weatherElement[12].time[0].elementValue[0].value);
			var weather_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[0].elementValue[0].value;
			var weather_value_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[0].elementValue[1].value.substr(1,1);
			var weather_value_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[1].elementValue[1].value.substr(1,1);
			var weather_value_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[12].time[2].elementValue[1].value.substr(1,1);
			$("#weather-description").text(weather_1);
			//skycons.set("weather-icon", icon); https://github.com/darkskyapp/skycons {"clear-day", "clear-night", "partly-cloudy-day", "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"}
			//Use dictionary to map weather icon (ForecastElement.PDF)
			var weather_dict = {1:"clear-day",2:"partly-cloudy-day",3:"partly-cloudy-day",4:"partly-cloudy-day",5:"cloudy",6:"cloudy",7:"cloudy",8:"rain",9:"rain"};
			
			// console.log(weather_value_1,weather_value_2,weather_value_3);
			var skycons = new Skycons({"color": "#A9DD9B"});
			skycons.set("weather-icon", weather_dict[weather_value_1]);
			skycons.set("weather-icon-day2", weather_dict[weather_value_1]);
			skycons.set("weather-icon-day3", weather_dict[weather_value_2]);
			skycons.set("weather-icon-day4", weather_dict[weather_value_3]);
			skycons.play();
			
			//舒適度 #feels-like
			var fl_1 = arr.cwbopendata.dataset.locations.location[0].weatherElement[7].time[0].value;
			$("#feels-like").text(fl_1);
			
			//溫度 #temp #day2-high-low, day3-high-low, day4-high-low 
			var now_T=arr.cwbopendata.dataset.locations.location[test].weatherElement[0].time[0].elementValue.value;
			var minT_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[4].time[0].elementValue.value;
			var minT_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[4].time[1].elementValue.value;
			var minT_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[4].time[2].elementValue.value;
			var maxT_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[3].time[0].elementValue.value;
			var maxT_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[3].time[1].elementValue.value;
			var maxT_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[3].time[2].elementValue.value;
			// $("#temp").text(Math.round((Number(minT_1) + Number(maxT_1)) / 2) + "°");
			$("#temp").text(now_T + "°");
			$("#day2-high-low").text(minT_1 + "~" + maxT_1 + "°C");
			$("#day3-high-low").text(minT_2 + "~" + maxT_2 + "°C");
			$("#day4-high-low").text(minT_3 + "~" + maxT_3 + "°C");
			
			//降雨機率 #day2-precip, day3-precip, day4-precip  ok
			var rain_1 = arr.cwbopendata.dataset.locations.location[test].weatherElement[9].time[0].elementValue.value;
			var rain_2 = arr.cwbopendata.dataset.locations.location[test].weatherElement[9].time[1].elementValue.value;
			var rain_3 = arr.cwbopendata.dataset.locations.location[test].weatherElement[9].time[2].elementValue.value;
			$("#day2-precip").text(rain_1 + "%");
			$("#day3-precip").text(rain_2 + "%");
			$("#day4-precip").text(rain_3 + "%");
		})
		.fail(function() {
			console.log("Get Taiwan weather fail!");
		})
		.always(function() {
			// console.log("Get Taiwan weather complete.");
		});
	}
	
	//華氏攝氏轉換 Celsius & Fahrenheit conversion function
	function C2F(c_degree) {
		var f_degree = Math.round(Number(c_degree) * 9 / 5 + 32);
		return f_degree;
	}
	
	function F2C(f_degree) {
		var c_degree = Math.round((Number(f_degree) - 32) * 5 / 9);
		return c_degree;
	}
	
	//#cbutton 將華氏轉攝氏
	$("#cbutton").click(function(event) {
		today_T_length = $("#temp").text().length;
		today_T = $("#temp").text().substring(0,today_T_length - 1);
		$("#temp").text(F2C(today_T) + "°");
	});//end cbutton
	
	//#fbutton 將攝氏轉華氏
	$("#fbutton").click(function(event) {
		today_T_length = $("#temp").text().length;
		today_T = $("#temp").text().substring(0,today_T_length - 1);
		$("#temp").text(C2F(today_T) + "°");
	});//end fbutton
	
	
});//end ready
