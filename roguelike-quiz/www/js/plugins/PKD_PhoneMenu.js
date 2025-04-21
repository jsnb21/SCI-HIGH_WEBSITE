/*
 * Copyright (c) 2023 Vladimir Skrypnikov (Pheonix KageDesu)
 * <http://kdworkshop.net/>
 *

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 */

/*:
 * @plugindesc (v.0.7)[BASIC] Mobile Phone Menu
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/phone-menu
 *
 * @help
 * ---------------------------------------------------------------------------

 * This is BASIC plugin version and have some restrictions:
 *    - No updates with new features and content
 *    - Obfuscated code
 *    - Plugin usage allowed only in Non-Commercial project
 * 
 *  PRO version of plugin don't have this restrictions!
 
 * ===========================================================================
 * This plugin add mobile phone (smartphone) menu with alternative
 * messaging system.
 * You can add menu items (phone apps) in phone menu via Plugin Parameters
 *
 * Plugin have resources: img\pPhoneMenu, you can edit them for your purposes
 *
 * ---------------------------------------------------------------------------
 * Script calls:
 * 
 * - Phone.Show(); - Open (show) phone menu
 * - Phone.Hide(); - Hide (close) phone menu
 * - Phone.Disable(); - Disable phone menu (can't be opened)
 * - Phone.Enable(); - Enable phone menu
 *
 * - Phone.AddApp("ID"); - Add APP to Phone Menu (by ID from Plugin Parameters)
 * - Phone.RemoveApp("ID"); - Remove APP from Phone Menu
 *
 * Example: Phone.AddApp("saveApp");
 * Example: Phone.RemoveApp("loadApp");
 *
 * - Phone.ChangePhone("NAME"); - Change phone image to NAME.png
 *              image should be in img\pPhoneMenu folder
 *
 * - Phone.ChangeWallpaper("NAME"); - Change phone wallpaper image
 *
 *
 * Script calls relative Phone Icon on map:
 *
 * - PhoneIcon.Show();
 * - PhoneIcon.Hide();
 * - PhoneIcon.Enable();
 * - PhoneIcon.Disable();
 *
 * ---------------------------------------------------------------------------
 * Messages system:
 *
 * For add new message use script call:
 *
 * - Phone.AddMessage("A", "N", ID);
 *      Add new message, A - avatar image name, N - from who (name),
 *          ID - common event Id for conversation content
 *                              (with event message commands)
 *
 * Example: Phone.AddMessage("avaActor1", "John", 22);
 *
 * Common Event should containt messages and choices
 *  (only 2 choices variants supported)
 *
 * Common Event inside converstaion also support next event commands:
 *  - Common Event
 *  - Control Variable
 *  - Control Switches
 *  - Plugin Command (MV only)
 *
 * - Phone.IsHaveNewMessages(); - return true if you have any unread message
 *
 *
 * For default Message App (with ID "messagesApp") parameter Alert Switch is
 * turning ON by automatically when you call Phone.AddMessage script call
 *
 * ---------------------------------------------------------------------------
 * ! Examples you can find in plugin Demo project!
 * ---------------------------------------------------------------------------
 * If you like my Plugins, want more and offten updates,
 * please support me on Boosty or Patreon!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * Patreon Page:
 *      https://www.patreon.com/KageDesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * You can use this plugin in your game thanks to all who supports me!
 * 

 * License: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_PhoneMenu
 * 
 * @param phoneSettings:j
 * @parent PKD_PhoneMenu
 * @type note
 * @text Phone Settings
 * @desc Settings, in [param name]:[value] format. You can change values after :
 * @default "\"openPhoneKey\": \"p\"\n\"screenSize\": { \"w\": 278, \"h\": 434 }\n\"screenOffset\": { \"x\": 16, \"y\": 86 }\n\"phonePosition\": { \"x\": \"Graphics.width / 2 - 155\", \"y\": \"20\" }\n\"appsGrid\": { \"x\": 3, \"y\": 4 }\n\"isAnimate\": true\n\"animationSpeed\": 24\n\"appBackgroundColor\": \"#FFF\"\n\"image\": \"PhoneFace\"\n\"wallpaper\": \"Wallpaper1\"\n\"isShowMapIcon\": true\n\"mapIconPosition\": { \"x\": 4, \"y\": 120 }"
 * 
 * @param phoneDefaultAppsList
 * @parent PKD_PhoneMenu
 * @type text
 * @text Default Apps
 * @desc List of default Apps for Phone Menu (separated by comma)
 * @default messagesApp, saveApp, loadApp, settingsApp
 * 
 * @param phoneApps:structA
 * @parent phoneDefaultAppsList
 * @type struct<AppItem>[]
 * @text Apps
 * @default ["{\"id:str\":\"messagesApp\",\"name:str\":\"Messages\",\"icon:str\":\"AppIcon_Messages\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"Phone.StartApp('messagesApp')\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"1\"}","{\"id:str\":\"saveApp\",\"name:str\":\"Save\",\"icon:str\":\"AppIcon_SaveGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Save)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"loadApp\",\"name:str\":\"Load\",\"icon:str\":\"AppIcon_LoadGame\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Load)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}","{\"id:str\":\"settingsApp\",\"name:str\":\"Settings\",\"icon:str\":\"AppIcon_Settings\",\"visibleSwitchId:i\":\"0\",\"enabledSwitchId:i\":\"0\",\"commonEventId:str\":\"SceneManager.push(Scene_Options)\",\"isOuterStart:b\":\"false\",\"alertSwitchId:i\":\"0\"}"]
 * @desc Phone Apps
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*:ru
 * @plugindesc (v.0.7)[BASIC] Мобильный телефон
 * @author Pheonix KageDesu
 * @target MZ MV
 * @url http://kdworkshop.net/plugins/phone-menu
 *
 * @help
 * ---------------------------------------------------------------------------

 * Это [BASIC] (базовая) версия плагина и имеет некоторые ограничения:
 *    - Нет обновлений плагина с новым контентом и функциями
 *    - Обфусцированный код
 *    - ЗАПРЕЩЕНО использовать плагин в коммерческих проектах
 * 
 *  [PRO] версия плагина не имеет данных ограничений!
 
 * ===========================================================================
 * !!! Полный перевод будет позже !!!
 *
 * This plugin add mobile phone (smartphone) menu with alternative
 * messaging system.
 * You can add menu items (phone apps) in phone menu via Plugin Parameters
 *
 * Ресурсы тут: img\pPhoneMenu, файлы можно редактировать
 *
 * ---------------------------------------------------------------------------
 * Вызовы скриптов:
 * 
 * - Phone.Show(); - Open (show) phone menu
 * - Phone.Hide(); - Hide (close) phone menu
 * - Phone.Disable(); - Disable phone menu (can't be opened)
 * - Phone.Enable(); - Enable phone menu
 *
 * - Phone.AddApp(ID); - Add APP to Phone Menu (by ID from Plugin Parameters)
 * - Phone.RemoveApp(ID); - Remove APP from Phone Menu
 *
 * - Phone.ChangePhone("NAME"); - Change phone image to NAME.png
 *              image should be in img\pPhoneMenu folder
 *
 * - Phone.ChangeWallpaper("NAME"); - Change phone wallpaper image
 *
 *
 * Script calls relative Phone Icon on map:
 *
 * - PhoneIcon.Show();
 * - PhoneIcon.Hide();
 * - PhoneIcon.Enable();
 * - PhoneIcon.Disable();
 *
 * ---------------------------------------------------------------------------
 * Система сообщений в телефоне:
 *
 * For add new message use script call:
 *
 * - Phone.AddMessage(A, N, ID);
 *      Add new message, A - avatar image name, N - from who (name),
 *          ID - common event Id for conversation content
 *                              (with event message commands)
 *
 * Common Event should containt messages and choices
 *  (only 2 choices variants supported)
 *
 * Common Event inside converstaion also support next event commands:
 *  - Common Event
 *  - Control Variable
 *  - Control Switches
 *  - Plugin Command (MV only)
 *
 * - Phone.IsHaveNewMessages(); - return true if you have any unread message
 *
 *
 * ---------------------------------------------------------------------------
 * ! Примеры использования комманд можно найти в демке !
 * ---------------------------------------------------------------------------
 * Если Вам нравятся мои плагины, поддержите меня на Boosty!
 * 
 * Boosty Page:
 *      https://boosty.to/kagedesu
 * YouTube Channel:
 *      https://www.youtube.com/channel/UCA3R61ojF5vp5tGwJ1YqdgQ?
 *
 * 

 * Лицензия: Creative Commons 4.0 Attribution, Share Alike, Non-Commercial

 *
 * 
 * @param PKD_PhoneMenu
 * 
 * @param spacer|endHolder @text‏‏‎ ‎@desc ===============================================
 * 
 * @command EMPTY_HOLDER
 * @text ‏
 * @desc
 * @default
 */
/*~struct~AppItem:

 @param id:str
 @text ID
 @type text 
 @desc Unique App ID for add or remove by script call to Phone Menu
 @default myApp

 @param name:str
 @text Name
 @type text 
 @desc Displayed name in Phone Menu
 @default MyApp 


 @param icon:str
 @text Icon
 @type file
 @dir img\pPhoneMenu\
 @require 1
 @desc Icon image name 
 @default 

 @param visibleSwitchId:i
 @text Visible Switch
 @type switch 
 @desc Switch for APP visibility
 @default 0


 @param enabledSwitchId:i
 @text Available Switch
 @type switch 
 @desc Switch for APP enabled or disable state
 @default 0


 @param commonEventId:str
 @text Common Event
 @type common_event 
 @desc Common Event for App (or script call)
 @default 1


 @param isOuterStart:b
 @text Is exit when started?
 @type boolean 
 @on Yes
 @off No
 @desc If true - App will close phone and will be executed on game map
 @default false 


 @param alertSwitchId:i
 @text Alert Switch
 @type switch 
 @desc When this Switch is ON, you will see red alert cirle on this App icon
 @default 0

*/



var Imported = Imported || {};
Imported.PKD_PhoneMenu = true;

var PKD_PhoneMenu = {};
PKD_PhoneMenu.Version = 70;

//?VERSION
PKD_PhoneMenu.isPro = function() { return false; };

PKD_PhoneMenu.PP = {};
PKD_PhoneMenu.Utils = {};

// * Загрзука параметров
PKD_PhoneMenu.LoadPluginSettings = () => {
    PKD_PhoneMenu.PP._loader = new KDCore.ParamLoader('PKD_PhoneMenu');
};

window.Phone = PKD_PhoneMenu;

// * ROADMAP
// 0.8 - Notifications (map)
// 0.9 - Modal PopUps for Phone (Question, Choice)
// 1.0 - User Apps (you can create own simple App for Phone for your game purposes)
// 1.X+ More default comples Apps (like messages) and extra features

//TODO: Сделать
// Демка + проверка на MV
// Публикация

// --- --- --- --- ---

// Объект - App
// Объект - Notify (html)
// Объект - PopUp (html)

// Скрипты:
//Phone.Notify({title: "", text: "", img: "", se: ""})

// Звук когда пришло сообщение (будет на карте) - В параметры




// Доп. функции: PopUp's -> Phone.ShowModalText("Title", "Hello!")
// Phone.ShowModalQuestion("Title", "Are you Sure?", CE)
// Phone.ShowModalChoice("Title", "Text", ["Answer 1", CE], ["Answer 2", CE])
// Работают только когда сцена телефона активна!



//%[Для обновлений]
// * SubMenus (simple list) 
// Управляется SubMenu через вызовы скриптов Phone.AddItemToSubMenu("myMenu1", {img: "test", title: "Text", enbledSwitch:0, onClick: 2, onMap: true});
// * CE - должен поддерживать Extended Values, title - Extended Text

// * Возможность задавать background картинку для сообщений от того или иного персонажа (каждому свою)






/*
# ==========================================================================
# ==========================================================================
#
#   EMBEDDED PHEONIX KAGEDESU PLUGINS CORE LIBRARY
#   (This plugin may not use the entire code of this library)
#
# ==========================================================================
# ==========================================================================
 * 
 * 
 */



// Generated by CoffeeScript 2.6.1
// ==========================================================================
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ KDCore.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
// * LIBRARY WITH MZ AND MZ SUPPORT
//! {OUTER FILE}

//?rev 08.12.22
var KDCore;

window.Imported = window.Imported || {};

Imported.KDCore = true;

KDCore = KDCore || {};

// * Двузначные числа нельзя в версии, сравнение идёт по первой цифре поулчается (3.43 - нельзя, можно 3.4.3)
//%[МЕНЯТЬ ПРИ ИЗМЕНЕНИИ]
KDCore._fileVersion = '3.2.2';

// * Методы и библиотеки данной версии
KDCore._loader = 'loader_' + KDCore._fileVersion;

KDCore[KDCore._loader] = [];

// * Добавить библиотеку на загрузку
KDCore.registerLibraryToLoad = function(lib) {
  return KDCore[KDCore._loader].push(lib);
};

if ((KDCore.Version != null) && KDCore.Version >= KDCore._fileVersion) {
  // * ПРОПУСКАЕМ ЗАГРУЗКУ, так как уже загруженна более новая
  console.log('XDev KDCore ' + KDCore._fileVersion + ' skipped by new or exists version');
  KDCore._requireLoadLibrary = false;
} else {
  KDCore.Version = KDCore._fileVersion;
  KDCore.LIBS = KDCore.LIBS || {};
  KDCore.register = function(library) {
    return this.LIBS[library.name] = library;
  };
  window.KDCore = KDCore;
  // * ТРЕБУЕТСЯ ЗАГРУЗКА БИБЛИОТЕК
  KDCore._requireLoadLibrary = true;
}


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Array.prototype.delete = function() {
    var L, a, ax, what;
    what = void 0;
    a = arguments;
    L = a.length;
    ax = void 0;
    while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
        this.splice(ax, 1);
      }
    }
    return this;
  };
  Array.prototype.max = function() {
    return Math.max.apply(null, this);
  };
  Array.prototype.min = function() {
    return Math.min.apply(null, this);
  };
  Array.prototype.sample = function() {
    if (this.length === 0) {
      return [];
    }
    return this[KDCore.SDK.rand(0, this.length - 1)];
  };
  Array.prototype.first = function() {
    return this[0];
  };
  Array.prototype.last = function() {
    return this[this.length - 1];
  };
  Array.prototype.shuffle = function() {
    var k, n, v;
    n = this.length;
    while (n > 1) {
      n--;
      k = KDCore.SDK.rand(0, n + 1);
      v = this[k];
      this[k] = this[n];
      this[n] = v;
    }
  };
  Array.prototype.count = function() {
    return this.length;
  };
  Array.prototype.isEmpty = function() {
    return this.length === 0;
  };
  // * Ищет элемент, у которого поле ID == id
  Array.prototype.getById = function(id) {
    return this.getByField('id', id);
  };
  // * Ищет элемент, у которого поле FIELD (имя поля) == value
  return Array.prototype.getByField = function(field, value) {
    var e;
    try {
      return this.find(function(item) {
        return item[field] === value;
      });
    } catch (error) {
      e = error;
      console.warn(e);
      return null;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  Number.prototype.do = function(method) {
    return KDCore.SDK.times(this, method);
  };
  Number.prototype.clamp = function(min, max) {
    return Math.min(Math.max(this, min), max);
  };
  return Number.prototype.any = function(number) {
    return (number != null) && number > 0;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  String.prototype.toCss = function() {
    return KDCore.Color.FromHex(this).CSS;
  };
  String.prototype.toCSS = function() {
    return this.toCss();
  };
  String.prototype.isEmpty = function() {
    return this.length === 0 || !this.trim();
  };
  String.isNullOrEmpty = function(str) {
    if (str != null) {
      return str.toString().isEmpty();
    } else {
      return true;
    }
  };
  String.any = function(str) {
    return !String.isNullOrEmpty(str);
  };
  return String.prototype.replaceAll = function(search, replacement) {
    var target;
    target = this;
    return target.split(search).join(replacement);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.isMV = function() {
    return Utils.RPGMAKER_NAME.contains("MV");
  };
  KDCore.isMZ = function() {
    return !KDCore.isMV();
  };
  KDCore.warning = function(msg, error) {
    if (msg != null) {
      console.warn(msg);
    }
    if (error != null) {
      console.warn(error);
    }
  };
  KDCore.makeid = function(length) {
    var characters, charactersLength, i, result;
    result = '';
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    charactersLength = characters.length;
    i = 0;
    while (i < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      i++;
    }
    return result;
  };
  return KDCore.makeId = function() {
    return KDCore.makeid(...arguments);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var SDK;
  //?[DEPRECATED]
  // * SDK
  //------------------------------------------------------------------------------
  SDK = function() {
    throw new Error('This is a static class');
  };
  SDK.rand = function(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };
  SDK.setConstantToObject = function(object, constantName, constantValue) {
    object[constantName] = constantValue;
    if (typeof object[constantName] === 'object') {
      Object.freeze(object[constantName]);
    }
    Object.defineProperty(object, constantName, {
      writable: false
    });
  };
  SDK.convertBitmapToBase64Data = function(bitmap) {
    return bitmap._canvas.toDataURL('image/png');
  };
  SDK.times = function(times, method) {
    var i, results;
    i = 0;
    results = [];
    while (i < times) {
      method(i);
      results.push(i++);
    }
    return results;
  };
  SDK.toGlobalCoord = function(layer, coordSymbol = 'x') {
    var node, t;
    t = layer[coordSymbol];
    node = layer;
    while (node) {
      t -= node[coordSymbol];
      node = node.parent;
    }
    return (t * -1) + layer[coordSymbol];
  };
  SDK.canvasToLocalX = function(layer, x) {
    while (layer) {
      x -= layer.x;
      layer = layer.parent;
    }
    return x;
  };
  SDK.canvasToLocalY = function(layer, y) {
    while (layer) {
      y -= layer.y;
      layer = layer.parent;
    }
    return y;
  };
  SDK.isInt = function(n) {
    return Number(n) === n && n % 1 === 0;
  };
  SDK.isFloat = function(n) {
    return Number(n) === n && n % 1 !== 0;
  };
  SDK.checkSwitch = function(switchValue) {
    if (switchValue === 'A' || switchValue === 'B' || switchValue === 'C' || switchValue === 'D') {
      return true;
    }
    return false;
  };
  SDK.toNumber = function(string, none = 0) {
    var number;
    if (string == null) {
      return none;
    }
    number = Number(string);
    if (isNaN(number)) {
      return none;
    }
    return number;
  };
  SDK.isString = function(value) {
    return typeof value === "string";
  };
  SDK.isArray = function(value) {
    return Array.isArray(value);
  };
  //@[EXTEND]
  return KDCore.SDK = SDK;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var __alias_Bitmap_blt_kdCore, __alias_Bitmap_fillAll_kdCore;
  //@[ALIAS]
  __alias_Bitmap_fillAll_kdCore = Bitmap.prototype.fillAll;
  Bitmap.prototype.fillAll = function(color) {
    if (color instanceof KDCore.Color) {
      return this.fillRect(0, 0, this.width, this.height, color.CSS);
    } else {
      return __alias_Bitmap_fillAll_kdCore.call(this, color);
    }
  };
  //@[ALIAS]
  __alias_Bitmap_blt_kdCore = Bitmap.prototype.blt;
  Bitmap.prototype.blt = function(source, sx, sy, sw, sh, dx, dy, dw, dh) {
    if (this._needModBltDWH > 0) {
      dh = dw = this._needModBltDWH;
      __alias_Bitmap_blt_kdCore.call(this, source, sx, sy, sw, sh, dx, dy, dw, dh);
      this._needModBltDWH = null;
    } else {
      __alias_Bitmap_blt_kdCore.call(this, ...arguments);
    }
  };
  Bitmap.prototype.drawIcon = function(x, y, icon, size = 32, noSmoth = false) {
    var bitmap;
    bitmap = null;
    if (icon instanceof Bitmap) {
      bitmap = icon;
    } else {
      bitmap = KDCore.BitmapSrc.LoadFromIconIndex(icon).bitmap;
    }
    this._context.imageSmoothingEnabled = !noSmoth;
    this.drawOnMe(bitmap, x, y, size, size);
    this._context.imageSmoothingEnabled = true;
  };
  Bitmap.prototype.drawOnMe = function(bitmap, x = 0, y = 0, sw = 0, sh = 0) {
    if (sw <= 0) {
      sw = bitmap.width;
    }
    if (sh <= 0) {
      sh = bitmap.height;
    }
    this.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, sw, sh);
  };
  Bitmap.prototype.drawInMe = function(bitmap) {
    return Bitmap.prototype.drawOnMe(bitmap, 0, 0, this.width, this.height);
  };
  return Bitmap.prototype.drawTextFull = function(text, position = 'center') {
    return this.drawText(text, 0, 0, this.width, this.height, position);
  };
});


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_CharacterBase.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_CharacterBase.prototype;
  // * Нахожусь ли Я в точке по диагонале (рядом), относительно char
  _.kdInDiagonalPointRelativeTo = function(char) {
    var e, x, y;
    try {
      if (char == null) {
        return false;
      }
      ({x, y} = char);
      if (x === this.x - 1 && ((y === this.y - 1) || (y === this.y + 1))) {
        return true; // * left up or down
      }
      if (x === this.x + 1 && (y === this.y - 1 || y === this.y + 1)) {
        return true; // * right up or down
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
})();

// ■ END Game_CharacterBase.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var _input_onKeyDown, _input_onKeyUp, i, j, k, l;
  Input.KeyMapperPKD = {};
//Numbers
  for (i = j = 48; j <= 57; i = ++j) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i);
  }
//Letters Upper
  for (i = k = 65; k <= 90; i = ++k) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
//Letters Lower (for key code events)
  for (i = l = 97; l <= 122; i = ++l) {
    Input.KeyMapperPKD[i] = String.fromCharCode(i).toLowerCase();
  }
  
  //@[ALIAS]
  _input_onKeyDown = Input._onKeyDown;
  Input._onKeyDown = function(event) {
    _input_onKeyDown.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode);
  };
  //@[ALIAS]
  _input_onKeyUp = Input._onKeyUp;
  Input._onKeyUp = function(event) {
    _input_onKeyUp.call(this, event);
    if (Input.keyMapper[event.keyCode]) {
      return;
    }
    Input._setStateWithMapperPKD(event.keyCode, false);
  };
  //?NEW
  Input._setStateWithMapperPKD = function(keyCode, state = true) {
    var symbol;
    symbol = Input.KeyMapperPKD[keyCode];
    if (symbol != null) {
      return this._currentState[symbol] = state;
    }
  };
  //?NEW
  Input.isCancel = function() {
    return Input.isTriggered('cancel') || TouchInput.isCancelled();
  };
  //?NEW
  return TouchInput.toPoint = function() {
    return new KDCore.Point(TouchInput.x, TouchInput.y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  PluginManager.getPluginParametersByRoot = function(rootName) {
    var pluginParameters, property;
    for (property in this._parameters) {
      if (this._parameters.hasOwnProperty(property)) {
        pluginParameters = this._parameters[property];
        if (PluginManager.isPluginParametersContentKey(pluginParameters, rootName)) {
          return pluginParameters;
        }
      }
    }
    return PluginManager.parameters(rootName);
  };
  return PluginManager.isPluginParametersContentKey = function(pluginParameters, key) {
    return pluginParameters[key] != null;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ___Sprite_alias_Move_KDCORE_2;
  Sprite.prototype.moveToCenter = function(dx = 0, dy = 0) {
    return this.move(-this.bitmap.width / 2 + dx, -this.bitmap.height / 2 + dy);
  };
  Sprite.prototype.setStaticAnchor = function(floatX = 1, floatY = 1) {
    this.x -= Math.round(this.width * floatX);
    this.y -= Math.round(this.height * floatY);
  };
  Sprite.prototype.moveToParentCenter = function() {
    if (!this.parent) {
      return;
    }
    return this.move(this.parent.width / 2, this.parent.height / 2);
  };
  ___Sprite_alias_Move_KDCORE_2 = Sprite.prototype.move;
  Sprite.prototype.move = function(x, y) {
    if (x instanceof Array) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x[0], x[1]);
    } else if (x instanceof KDCore.Point || ((x != null ? x.x : void 0) != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x.x, x.y);
    } else if ((x != null) && (x._x != null)) {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x._x, x._y);
    } else {
      return ___Sprite_alias_Move_KDCORE_2.call(this, x, y);
    }
  };
  Sprite.prototype.isContainsPoint = function(point) {
    var rect, rx, ry;
    if (this.width === 0 || this.height === 0) {
      return false;
    }
    rx = KDCore.SDK.toGlobalCoord(this, 'x');
    ry = KDCore.SDK.toGlobalCoord(this, 'y');
    rect = this._getProperFullRect(rx, ry);
    return rect.contains(point.x, point.y);
  };
  // * Возвращает Rect с учётом Scale и Anchor спрайта
  Sprite.prototype._getProperFullRect = function(rx, ry) {
    var height, width, x, y;
    width = this.width * Math.abs(this.scale.x);
    height = this.height * Math.abs(this.scale.y);
    x = rx - this.anchor.x * width;
    y = ry - this.anchor.y * height;
    if (this.anchor.x === 0 && this.scale.x < 0) {
      x += this.width * this.scale.x;
    }
    if (this.anchor.y === 0 && this.scale.y < 0) {
      y += this.height * this.scale.y;
    }
    return new PIXI.Rectangle(x, y, width, height);
  };
  Sprite.prototype.fillAll = function(color) {
    if (color != null) {
      return this.bitmap.fillAll(color);
    } else {
      return this.fillAll(KDCore.Color.WHITE);
    }
  };
  return Sprite.prototype.removeFromParent = function() {
    if (this.parent != null) {
      return this.parent.removeChild(this);
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return TouchInput.toMapPoint = function() {
    return this.toPoint().convertToMap();
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  KDCore.Utils = KDCore.Utils || {};
  return (function() {
    var _;
    _ = KDCore.Utils;
    _.getJDataById = function(id, source) {
      var d, j, len;
      for (j = 0, len = source.length; j < len; j++) {
        d = source[j];
        if (d.id === id) {
          return d;
        }
      }
      return null;
    };
    _.hasMeta = function(symbol, obj) {
      return (obj != null) && (obj.meta != null) && (obj.meta[symbol] != null);
    };
    _.getValueFromMeta = function(symbol, obj) {
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      return obj.meta[symbol];
    };
    _.getNumberFromMeta = function(symbol, obj) {
      var value;
      if (!_.hasMeta(symbol, obj)) {
        return null;
      }
      if (obj.meta[symbol] === true) {
        return 0;
      } else {
        value = KDCore.SDK.toNumber(obj.meta[symbol], 0);
      }
      return value;
    };
    _.isSceneMap = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Map;
      } catch (error) {
        return false;
      }
    };
    _.isSceneBattle = function() {
      try {
        return !SceneManager.isSceneChanging() && SceneManager._scene instanceof Scene_Battle;
      } catch (error) {
        return false;
      }
    };
    _.getEventCommentValue = function(commentCode, list) {
      var comment, e, i, item;
      try {
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                return comment;
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    };
    _.getEventCommentValueArray = function(commentCode, list) {
      var comment, comments, e, i, item;
      try {
        comments = [];
        if (list && list.length > 1) {
          i = 0;
          while (i < list.length) {
            item = list[i++];
            if (!item) {
              continue;
            }
            if (item.code === 108) {
              comment = item.parameters[0];
              if (comment.contains(commentCode)) {
                comments.push(comment);
              }
            }
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return comments;
    };
    _.getPositionPointFromJSON = function(jsonSettings) {
      return _.convertPositionPointFromJSON(jsonSettings.position);
    };
    _.convertPositionPointFromJSON = function(position) {
      var e, x, y;
      try {
        x = position[0];
        y = position[1];
        if (!KDCore.SDK.isInt(x)) {
          x = eval(x);
        }
        if (!KDCore.SDK.isInt(y)) {
          y = eval(y);
        }
        return new KDCore.Point(x, y);
      } catch (error) {
        e = error;
        console.warn('Utils.getPositionPointFromJSON', e);
        return KDCore.Point.Empty;
      }
    };
    _.jsonPos = function(jsonPosition) {
      return _.convertPositionPointFromJSON(jsonPosition);
    };
    _.jsonPosXY = function(jsonPosition) {
      var e, x, y;
      try {
        ({x, y} = jsonPosition);
        return new KDCore.Point(eval(x), eval(y));
      } catch (error) {
        e = error;
        console.warn('Utils.jsonPosXY', e);
        return KDCore.Point.Empty;
      }
    };
    _.getVar = function(id) {
      return $gameVariables.value(id);
    };
    _.setVar = function(id, value) {
      return $gameVariables.setValue(id, value);
    };
    _.addToVar = function(id, value) {
      var prevVal;
      prevVal = _.getVar(id);
      return _.setVar(id, prevVal + value);
    };
    _.playSE = function(seFileName, pitch = 100, volume = 100) {
      var sound;
      if (seFileName == null) {
        return;
      }
      if (seFileName === "") {
        return;
      }
      sound = {
        name: seFileName,
        pan: 0,
        pitch: pitch,
        volume: volume
      };
      AudioManager.playStaticSe(sound);
    };
    _.getItemTypeId = function(item) {
      if (DataManager.isWeapon(item)) {
        return 1;
      } else if (DataManager.isArmor(item)) {
        return 2;
      }
      return 0;
    };
    _.getItemByType = function(itemId, typeId) {
      var data, e;
      try {
        if ((typeId != null) && !isFinite(typeId) && KDCore.SDK.isString(typeId) && String.any(typeId)) {
          if (typeId[0] === "w") {
            typeId = 1;
          } else if (typeId[0] === "a") {
            typeId = 2;
          } else {
            typeId = 0;
          }
        }
        data = [$dataItems, $dataWeapons, $dataArmors];
        return data[typeId][itemId];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    _.loadFont = function(name) {
      if (typeof FontManager === "undefined" || FontManager === null) {
        return;
      }
      if (String.isNullOrEmpty(name)) {
        return;
      }
      if (FontManager._states[name] != null) {
        return;
      }
      FontManager.load(name, name + ".ttf");
    };
    _.convertTimeShort = function(seconds) {
      var e;
      try {
        if (seconds > 59) {
          return Math.floor(seconds / 60) + 'm';
        } else {
          return seconds;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return seconds;
      }
    };
    _.isPointInScreen = function(point, margin = 10) {
      var maxH, maxW, screenMargin, x, y;
      ({x, y} = point);
      maxW = Graphics.width;
      maxH = Graphics.height;
      // * Граница от краёв экрана
      screenMargin = margin;
      if (x < screenMargin) {
        return false;
      }
      if (y < screenMargin) {
        return false;
      }
      if (x > (maxW - screenMargin)) {
        return false;
      }
      if (y > (maxH - screenMargin)) {
        return false;
      }
      return true;
    };
    // * Ассинхронная загрузка изображения, возвращает bitmap, когда загружен
    // * Пример использования loadImageAsync(a, b).then(метод)
    // в метод будет передан bitmap первым аргументом
    _.loadImageAsync = async function(folder, filename) {
      var promise;
      promise = new Promise(function(resolve, reject) {
        var b;
        b = ImageManager.loadBitmap("img/" + folder + "/", filename);
        return b.addLoadListener(function() {
          return resolve(b);
        });
      });
      return (await promise);
    };
    // * Преобразовать расширенное значение
    // * Значение может быть X -> X
    // * "X" -> X (цифра)
    // * "X,Y,Z,..." -> [X, Y, Z]
    // * "[X, Y, Z,...]" -> [X, Y, Z]
    // * "X|V" -> из переменной X
    // * [Y] -> случайное число из массива (рекурсивно)
    //@[2.8.1] since
    _.getEValue = function(value) {
      var e, items, randomValue, variableId;
      try {
        if (value == null) {
          return null;
        }
        if (KDCore.SDK.isString(value)) {
          if (isFinite(value)) { // * Число представленно строкой
            return Number(value);
          }
          // * Массив представлен строкой (может быть без квадратных скобок)
          if (value.contains(',') || (value.contains("[") && value.contains("]"))) {
            value = value.replace("[", "");
            value = value.replace("]", "");
            // * Преобразуем в число или строку (например если extended |V)
            items = value.split(",").map(function(item) {
              var itemT;
              itemT = item.trim();
              if (isFinite(itemT)) {
                return Number(itemT);
              } else {
                return itemT;
              }
            });
            // * Вызываем снова эту функцию, но уже с массивом
            return KDCore.Utils.getEValue(items);
          }
          if (value.contains("|V")) {
            variableId = parseInt(value);
            return $gameVariables.value(variableId);
          }
          return value; // * Просто значение в итоге
        } else if (KDCore.SDK.isArray(value)) {
          randomValue = value.sample();
          return KDCore.Utils.getEValue(randomValue);
        } else {
          return value;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return value;
      }
    };
    //@[2.8.2] since
    _.isChanceIsGood = function(chance) {
      var e;
      try {
        if (chance > 1) {
          chance /= 100;
        }
        return chance > Math.random();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[2.8.2] since
    //KEY:w:3:1:50 , KEY:i:10:2:1|V
    //OUTPUT: [GameItem, COUNT]
    _.parseItemFromConditionStr = function(conditionLine) {
      var amount, e, itemChance, itemId, parts, typeId;
      try {
        if (!conditionLine.contains(":")) {
          return null;
        }
        parts = conditionLine.split(":");
        typeId = parts[1];
        itemId = KDCore.Utils.getEValue(parts[2]);
        amount = KDCore.Utils.getEValue(parts[3]);
        if (amount <= 0) {
          return null;
        }
        try {
          itemChance = String.any(parts[4]) ? parts[4] : 100;
          itemChance = KDCore.Utils.getEValue(itemChance) / 100;
        } catch (error) {
          e = error;
          KDCore.warning(e);
          itemChance = 0;
        }
        if (itemChance <= 0) {
          return null;
        }
        if (KDCore.Utils.isChanceIsGood(itemChance)) {
          return [KDCore.Utils.getItemByType(itemId, typeId), amount];
        } else {
          return null;
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null;
      }
    };
    //@[3.2.1] since
    _.isValidCE = function(commonEventId) {
      var e;
      try {
        return commonEventId > 0 && ($dataCommonEvents[commonEventId] != null);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    //@[3.2.1] since
    _.startCE = function(commonEventId) {
      var e;
      try {
        if (this.isValidCE(commonEventId)) {
          return $gameTemp.reserveCommonEvent(commonEventId);
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    _.checkSwitch = function(value) {
      if (value == null) {
        return false;
      }
      if (isFinite(value)) {
        return false;
      }
      return KDCore.SDK.checkSwitch(value);
    };
    //@[3.2.1] since
    // * Вызвать с задержкой в time миллисекунд
    // * Не забываем про bind
    _.callDelayed = function(method, time = 1) {
      var e;
      try {
        if (method == null) {
          return;
        }
        setTimeout((function() {
          var e;
          try {
            return method();
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        }), time);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
    //@[3.2.1] since
    //<meta:1,2,3,4> -> [1,2,3,4]
    _.getArrayOfNumbersFromMeta = function(symbol, obj) {
      var e, values;
      try {
        values = this.getArrayOfValuesFromMeta(symbol, obj);
        return values.map(function(v) {
          return Number(v);
        });
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    //<meta:a,b,c> -> ["a", "b", "c"]
    //<meta:a> -> ["a"]
    _.getArrayOfValuesFromMeta = function(symbol, obj) {
      var e, items, values;
      try {
        values = this.getValueFromMeta(symbol, obj);
        if (String.any(values)) {
          if (values.contains(',')) {
            items = values.split(',');
            return items || [];
          } else {
            return [values];
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return [];
      }
    };
    //@[3.2.1] since
    // * Когда содержит одинаковый набор ключей
    //<meta:value1>
    //<meta:value2>
    //...
    // -> [value1,value2,...]
    _.getArrayOfValuesOfSameMeta = function(symbol, obj) {
      var e, j, len, line, lines, result;
      try {
        if (!this.hasMeta(symbol, obj)) {
          return [];
        }
        lines = obj.note.split("\n").filter(function(l) {
          return l.contains(symbol);
        });
        result = [];
        for (j = 0, len = lines.length; j < len; j++) {
          line = lines[j];
          try {
            line = line.replace("<" + symbol + ":", "");
            line = line.replace(">", "");
            result.push(line);
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }
        return result;
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return [];
    };
    //@[2.9.7] since
    // * Shrink number 100000 to "100k" and ect, returns STRING
    _.formatNumberToK = function(num) {
      var e;
      try {
        if (num >= 1000000000) {
          return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
        }
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
          return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return num;
      }
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return Window_Base.prototype.drawFaceWithCustomSize = function(faceName, faceIndex, x, y, finalSize) {
    this.contents._needModBltDWH = finalSize;
    this.drawFace(faceName, faceIndex, x, y);
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return (function() {    // * Input Extension: KDGamepad
    //------------------------------------------------------------------------------
    // * Поддержка расширенного управления через геймпад (свой модуль)
    var ALIAS___updateGamepadState, _;
    //@[DEFINES]
    _ = Input;
    // * Активировать работу модуля KDGamepad
    _.activateExtendedKDGamepad = function() {
      return _._kdIsGamepadExtended = true;
    };
    //@[ALIAS]
    ALIAS___updateGamepadState = _._updateGamepadState;
    _._updateGamepadState = function(gamepad) {
      if (Input._kdIsGamepadExtended === true) {
        KDGamepad.update();
      }
      if ((typeof $gameTemp !== "undefined" && $gameTemp !== null ? $gameTemp.__kdgpStopDefaultGamepad : void 0) === true) {
        return;
      }
      // * Режим перемещения без DPad
      // * В оригинале игрок также ходит по DPad клавишам, что может быть не удобно
      // * например при работе с инвентарём
      if (KDGamepad.isNoDPadMoving()) {
        if (KDGamepad.isDPadAny()) {
          Input.clear();
          return;
        }
      }
      ALIAS___updateGamepadState.call(this, gamepad);
    };
    window.KDGamepad = function() {
      return new Error("This is static class");
    };
    window.addEventListener("gamepadconnected", function(event) {
      var e;
      try {
        return KDGamepad.refresh();
      } catch (error) {
        // * Можно напрямую
        //unless KDGamepad.isExists()
        //    if event.gamepad? and event.gamepad.mapping == 'standard'
        //        KDGamepad.init(event.gamepad)
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    window.addEventListener("gamepaddisconnected", function(event) {
      var e;
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        if ((event.gamepad != null) && event.gamepad === KDGamepad.gamepad) {
          return KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return KDGamepad.stop();
      }
    });
    KDGamepad.stopDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = true;
    };
    KDGamepad.resumeDefaultGamepad = function() {
      $gameTemp.__kdgpStopDefaultGamepad = null;
    };
    // * Ссылка на геймпад
    KDGamepad.gamepad = null;
    // * Подключён ли Gamepad ?
    KDGamepad.isExists = function() {
      return KDGamepad.gamepad != null;
    };
    // * Инициализация состояния кнопок
    // * Этот метод вызывается автоматически из Refresh или при подключении Gamepad
    KDGamepad.init = function(gamepad) {
      KDGamepad.gamepad = gamepad;
      this._isActive = true;
      this.buttonNames = [
        'A', // 0
        'B', // 1
        'X', // 2
        'Y', // 3
        'LB', // 4
        'RB', // 5
        'LTrigger', // 6
        'RTrigger', // 7
        'Back', // 8
        'Start', // 9
        'LStick', // 10
        'RStick', // 11
        'dUp', // 12
        'dDown', // 13
        'dLeft', // 14
        'dRight' // 15
      ];
      this.reset();
    };
    // * Аналог Input.clear
    KDGamepad.clear = function() {
      return KDGamepad.reset();
    };
    // * Сбросить состояние кнопок
    KDGamepad.reset = function() {
      this.leftStick = {
        x: 0,
        y: 0
      };
      this.rightStick = {
        x: 0,
        y: 0
      };
      this.buttons = {};
      this.buttonsPressed = {};
      this.prevButtons = {};
    };
    
    // * Остановить учёт геймпада
    KDGamepad.stop = function() {
      KDGamepad.reset();
      KDGamepad.gamepad = null;
    };
    // * Функция проверки что нажата кнопка на геймпаде
    KDGamepad._buttonPressed = function(gamepad, index) {
      var b, e;
      try {
        if (!gamepad || !gamepad.buttons || index >= gamepad.buttons.length) {
          return false;
        }
        b = gamepad.buttons[index];
        if (b == null) {
          return false;
        }
        if (typeof b === 'object') {
          // * Можно упростить
          return b.pressed;
        }
        return b === 1.0;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return false;
      }
    };
    // * Каждый кадр (обновление состояний)
    KDGamepad.update = function() {
      var e, gp, i, isDown, j, len, name, ref;
      if (!KDGamepad.isActive()) {
        return;
      }
      KDGamepad.refresh();
      if (!KDGamepad.isExists()) {
        return;
      }
      try {
        gp = KDGamepad.gamepad;
        ref = this.buttonNames;
        // * Проверка состояний кнопок
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          name = ref[i];
          this.buttons[name] = false;
          isDown = KDGamepad._buttonPressed(gp, i);
          if (isDown === true) {
            this.prevButtons[name] = true;
          } else {
            // * Срабатываение только при нажал - отпустил
            if (this.prevButtons[name] === true) {
              this.buttons[name] = true;
              this.prevButtons[name] = false;
            }
          }
        }
        // * Проверка стиков
        this.leftStick.x = gp.axes[0];
        this.leftStick.y = gp.axes[1];
        this.rightStick.x = gp.axes[2];
        this.rightStick.y = gp.axes[3];
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Обновить и проверить состояние Gamepad
    // * Надо каждый раз это вызывать
    KDGamepad.refresh = function() {
      var e, gamepads, gp, i, isGamepadRefreshed, j, ref;
      try {
        isGamepadRefreshed = false;
        if (navigator.getGamepads) {
          gamepads = navigator.getGamepads();
        } else if (navigator.webkitGetGamepads) {
          gamepads = navigator.webkitGetGamepads();
        }
        if (gamepads != null) {
          for (i = j = 0, ref = gamepads.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
            gp = gamepads[i];
            if ((gp != null) && gp.mapping === 'standard') {
              isGamepadRefreshed = true;
              if (KDGamepad.buttonNames != null) {
                KDGamepad.gamepad = gp;
              } else {
                KDGamepad.init(gp);
              }
              break;
            }
          }
        }
        if (!isGamepadRefreshed) {
          // * Если не был найден не один gamepad - отключаем систему
          KDGamepad.stop();
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
        KDGamepad.stop();
      }
    };
    // * Любое нажатие кнопки
    KDGamepad.isKeyAny = function(name) {
      return KDGamepad.isKey(name) || KDGamepad.isKeyPressed(name);
    };
    // * Нажата ли кнопка (trigger нажал - отпустил)
    KDGamepad.isKey = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.buttons[name] === true;
    };
    // * Нажата ли кнопка (continues зажата)
    KDGamepad.isKeyPressed = function(name) {
      if (!KDGamepad.isExists()) {
        return false;
      }
      if (this.buttons == null) {
        return false;
      }
      return this.prevButtons[name] === true;
    };
    KDGamepad.isDPadAny = function() {
      return KDGamepad.isKeyAny("dLeft") || KDGamepad.isKeyAny("dRight") || KDGamepad.isKeyAny("dUp") || KDGamepad.isKeyAny("dDown");
    };
    KDGamepad.isActive = function() {
      return this._isActive === true;
    };
    // * Временно отключить обработку KDGamepad
    KDGamepad.setActive = function(_isActive) {
      this._isActive = _isActive;
      if (KDGamepad.isActive()) {
        KDGamepad.refresh();
      } else {
        KDGamepad.stop();
      }
    };
    // * Отключить перемещение игрока на DPad
    KDGamepad.setNoDPadMovingMode = function(_noDpadMoving) {
      this._noDpadMoving = _noDpadMoving;
    };
    return KDGamepad.isNoDPadMoving = function() {
      return this._noDpadMoving === true;
    };
  })();
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var BitmapSrc;
  BitmapSrc = (function() {
    //?[DEPRECATED]
    class BitmapSrc {
      constructor() {
        this.bitmap = null;
      }

      static LoadFromIconIndex(iconIndex) {
        var bs, icon_bitmap, iconset, ph, pw, sx, sy;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[iconIndex] == null) {
          iconset = ImageManager.loadSystem('IconSet');
          if (KDCore.isMV()) {
            pw = Window_Base._iconWidth;
            ph = Window_Base._iconHeight;
          } else {
            pw = ImageManager.iconWidth;
            ph = ImageManager.iconHeight;
          }
          sx = iconIndex % 16 * pw;
          sy = Math.floor(iconIndex / 16) * ph;
          icon_bitmap = new Bitmap(pw, ph);
          icon_bitmap.addLoadListener(function() {
            icon_bitmap.blt(iconset, sx, sy, pw, ph, 0, 0);
          });
          BitmapSrc.CACHE[iconIndex] = icon_bitmap;
        }
        bs.bitmap = BitmapSrc.CACHE[iconIndex];
        return bs;
      }

      static LoadFromImageFolder(filename) {
        var bs;
        bs = new BitmapSrc();
        bs.bitmap = ImageManager.loadPicture(filename);
        return bs;
      }

      static LoadFromBase64(data, name) {
        var bs;
        bs = new BitmapSrc();
        if (name != null) {
          if (BitmapSrc.CACHE[name] != null) {
            bs.bitmap = BitmapSrc.CACHE[name];
          } else {
            BitmapSrc.CACHE[name] = Bitmap.load(data);
            bs.bitmap = BitmapSrc.CACHE[name];
          }
        } else {
          bs.bitmap = Bitmap.load(data);
        }
        return bs;
      }

      static LoadFromMemory(symbol) {
        var bs;
        bs = new BitmapSrc();
        if (BitmapSrc.CACHE[symbol] != null) {
          bs.bitmap = BitmapSrc.CACHE[symbol];
        } else {
          bs.bitmap = ImageManager.loadEmptyBitmap();
        }
        return bs;
      }

    };

    BitmapSrc.CACHE = {};

    return BitmapSrc;

  }).call(this);
  //@[EXTEND]
  return KDCore.BitmapSrc = BitmapSrc;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Changer;
  // * Класс который может плавно изменять какой-либо параметр
  // * Работает в стиле chain методов

    // * ------------------ ПРИМЕР ----------------------------------

    // * Меняем прозрачность 4 раза, туда-сюда, затем выводим done в консоль

    //@changer = new AA.Changer(someSprite)
  //@changer.change('opacity').from(255)
  //            .to(0).step(5).speed(1).delay(30).repeat(4).reverse()
  //            .start().done(() -> console.log('done'))
  //@changer.update()

    // * -------------------------------------------------------------
  Changer = class Changer {
    constructor(obj) {
      this.obj = obj;
      // * Количество кадров, в которые будет обновление
      this._field = null; // * название поля
      this._speed = 1; // * frames
      this._step = 1; // * шаг изменения значения
      this._from = 0; // * Начальное значение
      this._to = 0; // * Конечное значение
      this._thread = null;
      this._orienation = true; // * Направление + или - step (true = +)
      this._delay = 0; // * Задержка старта
      this._changer = null; // * Ссылка на следующий changer
      this._isRepeat = false; // * Надо ли поторить себя снова
      this._onDoneMethod = null; // * Метод будет выполнен в конце (при завершении)
      this._isPrepared = false; // * Элемента был подготовлен (установлено значение from)
    }

    start() {
      if (this._field == null) {
        return;
      }
      if (this._from === this._to) {
        return;
      }
      if (this._delay > 0) {
        this._delayThread = new KDCore.TimedUpdate(this._delay, this._startThread.bind(this));
        this._delayThread.once();
      } else {
        this._startThread();
      }
      return this;
    }

    isStarted() {
      return (this._thread != null) || (this._delayThread != null);
    }

    from(_from) {
      this._from = _from;
      return this;
    }

    to(_to) {
      this._to = _to;
      return this;
    }

    step(_step) {
      this._step = _step;
      return this;
    }

    speed(_speed) {
      this._speed = _speed;
      return this;
    }

    change(_field) {
      this._field = _field;
      return this;
    }

    // * Снова повторить (не совместим с then)
    // * Если ничего не указать, или <= 0 -> то бескончно
    repeat(_repeatCount = 0) {
      this._repeatCount = _repeatCount;
      if (this._repeatCount <= 0) {
        this._repeatCount = null;
      }
      this._isRepeat = true;
      this._changer = null;
      return this;
    }

    // * Снова повторить, но поменять местами to и from (работает только с repeat >= 2)
    reverse() {
      this._isReverse = true;
      return this;
    }

    isDone() {
      if (!this._isPrepared) {
        // * Чтобы не было выхода пока ждёт Delay
        return false;
      }
      // * Если от 255 до 0 (например)
      if (this._orienation === false) {
        // * То может быть меньше нуля (т.к. @step динамический)
        return this.value() <= this._to;
      } else {
        return this.value() >= this._to;
      }
    }

    value() {
      return this.obj[this._field];
    }

    stop() {
      this._thread = null;
      this._delayThread = null;
      if (this._changer == null) {
        // * Если есть связанный Changer, то не выполняем метод завршения
        return this._callDoneMethod();
      }
    }

    // * При ожидании, значения устанавливаются не сразу
    delay(_delay) {
      this._delay = _delay;
      return this;
    }

    // * Выполнить другой Changer после этого
    // * Не совместим с Repeat
    // * НЕЛЬЗЯ зацикливать, не будет работать
    // * Соединённый не надо обновлять вне, он обновляется в этом
    then(_changer) {
      this._changer = _changer;
      this._isRepeat = false;
      return this;
    }

    // * Этот метод будт выполнене в конце
    done(_onDoneMethod) {
      this._onDoneMethod = _onDoneMethod;
      return this;
    }

    // * Шаг можно выполнить и в ручную
    makeStep() {
      if (!this.isStarted()) {
        this._prepare();
      }
      this._makeStep();
      return this;
    }

    update() {
      var ref;
      if (this.isStarted()) {
        if (this._delay > 0) {
          if ((ref = this._delayThread) != null) {
            ref.update();
          }
        }
        if (this._thread != null) {
          this._updateMainThread();
        }
      } else {
        // * Если хоть раз был запущен
        if (this._isBeenStarted === true) {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
        }
      }
    }

    static CreateForOpacityUp(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(0).to(255).step(step);
      changer.done(function() {
        sprite.opacity = 255;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

    static CreateForOpacityDown(sprite, step = 35, onDone = null, isAutoStart = true) {
      var changer;
      changer = new Changer(sprite);
      changer.change('opacity').from(sprite.opacity).to(0).step(step);
      changer.done(function() {
        sprite.opacity = 0;
        if (onDone != null) {
          return onDone();
        }
      });
      if (isAutoStart) {
        changer.start();
      }
      return changer;
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Changer.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Changer.prototype;
    _._prepare = function() {
      if (this._field == null) {
        return;
      }
      this._orienation = this._from < this._to;
      if (!this._orienation) {
        this._step *= -1;
      }
      // * Устанавливаем начальное значение
      this.obj[this._field] = this._from;
      this._isPrepared = true;
    };
    _._makeStep = function() {
      var value;
      if (this.isDone()) {
        return;
      }
      value = this.value();
      value += this._step;
      this.obj[this._field] = value;
    };
    _._startThread = function() {
      this._prepare();
      if (this.isDone()) {
        return;
      }
      this._thread = new KDCore.TimedUpdate(this._speed, this._makeStep.bind(this));
      return this._isBeenStarted = true;
    };
    _._updateChainedChanger = function() {
      if (this._changer.isStarted()) {
        this._changer.update();
        if (this._changer.isDone()) {
          this._callDoneMethod();
          this._changer.stop();
          return this._changer = null;
        }
      } else {
        return this._changer.start();
      }
    };
    _._restart = function() {
      if (!this._isCanRepeatMore()) {
        return;
      }
      if (this._repeatCount == null) {
        // * Если указано! число повторений, то onDone метод не вызываем
        this._callDoneMethod();
      }
      if (this._isReverse === true) {
        this._swapFromTo();
      }
      this._prepare();
      return this.start();
    };
    _._swapFromTo = function() {
      var t;
      t = this._from;
      this._from = this._to;
      this._to = t;
      // * Инвентируем число step
      this._step *= -1;
    };
    _._callDoneMethod = function() {
      if (this._onDoneMethod != null) {
        return this._onDoneMethod();
      }
    };
    _._isCanRepeatMore = function() {
      if (this._repeatCount == null) {
        return true;
      }
      this._repeatCount--;
      if (this._repeatCount <= 0) {
        this.stop();
        return false;
      }
      return true;
    };
    _._updateMainThread = function() {
      this._thread.update();
      if (this.isDone()) {
        if (this._isRepeat === true) {
          this._restart();
        } else {
          if (this._changer != null) {
            this._updateChainedChanger();
          }
          this.stop();
        }
      }
    };
  })();
  // ■ END Changer.coffee
  //---------------------------------------------------------------------------

  //@[EXTEND]
  return KDCore.Changer = Changer;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color;
  Color = (function() {
    class Color {
      constructor(r1 = 255, g1 = 255, b1 = 255, a1 = 255) {
        this.r = r1;
        this.g = g1;
        this.b = b1;
        this.a = a1;
      }

      getLightestColor(lightLevel) {
        var bf, newColor, p;
        bf = 0.3 * this.R + 0.59 * this.G + 0.11 * this.B;
        p = 0;
        newColor = [0, 0, 0, 0];
        if (bf - lightLevel >= 0) {
          if (bf >= 0) {
            p = Math.abs(bf - lightLevel) / lightLevel;
          }
          newColor = this.ARR.map(function(c) {
            return c - (p * c);
          });
        } else {
          if (bf >= 0) {
            p = (lightLevel - bf) / (255 - bf);
          }
          newColor = this.ARR.map(function(c) {
            return [(255 - c) * p + c, 255].min();
          });
        }
        return new Color(newColor[0], newColor[1], newColor[2], newColor[3]);
      }

      clone() {
        return this.reAlpha(this.a);
      }

      reAlpha(newAlpha) {
        return new Color(this.r, this.g, this.b, newAlpha || 255);
      }

      static AddConstantColor(name, color) {
        color.toHex();
        color.toArray();
        color.toCSS();
        KDCore.SDK.setConstantToObject(Color, name, color);
      }

      toHex() {
        var b, g, r;
        if (this._colorHex != null) {
          return this._colorHex;
        }
        r = Math.floor(this.r).toString(16).padZero(2);
        g = Math.floor(this.g).toString(16).padZero(2);
        b = Math.floor(this.b).toString(16).padZero(2);
        return this._colorHex = '#' + r + g + b;
      }

      toArray() {
        if (this._colorArray != null) {
          return this._colorArray;
        }
        return this._colorArray = [this.r, this.g, this.b, this.a];
      }

      toCSS() {
        var na, nb, ng, nr;
        if (this._colorCss != null) {
          return this._colorCss;
        }
        nr = Math.round(this.r);
        ng = Math.round(this.g);
        nb = Math.round(this.b);
        na = this.a / 255;
        return this._colorCss = `rgba(${nr},${ng},${nb},${na})`;
      }

      toNumber() {
        return Number(this.toHex().replace("#", "0x"));
      }

      static Random() {
        var a, b, c;
        a = KDCore.SDK.rand(1, 254);
        b = KDCore.SDK.rand(1, 254);
        c = KDCore.SDK.rand(1, 254);
        return new Color(a, b, c, 255);
      }

      static FromHex(hexString) {
        var color, result;
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexString);
        color = null;
        if (result != null) {
          color = {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          };
        }
        if (color != null) {
          return new Color(color.r, color.g, color.b, 255);
        } else {
          return Color.NONE;
        }
      }

    };

    Object.defineProperties(Color.prototype, {
      R: {
        get: function() {
          return this.r;
        },
        configurable: true
      },
      G: {
        get: function() {
          return this.g;
        },
        configurable: true
      },
      B: {
        get: function() {
          return this.b;
        },
        configurable: true
      },
      A: {
        get: function() {
          return this.a;
        },
        configurable: true
      },
      ARR: {
        get: function() {
          return this.toArray();
        },
        configurable: true
      },
      CSS: {
        get: function() {
          return this.toCSS();
        },
        configurable: true
      },
      HEX: {
        get: function() {
          return this.toHex();
        },
        configurable: true
      },
      OX: {
        get: function() {
          return this.toNumber();
        },
        configurable: true
      }
    });

    Color.AddConstantColor('NONE', new Color(0, 0, 0, 0));

    Color.AddConstantColor('BLACK', new Color(0, 0, 0, 255));

    Color.AddConstantColor('WHITE', new Color(255, 255, 255, 255));

    Color.AddConstantColor('RED', new Color(255, 0, 0, 255));

    Color.AddConstantColor('GREEN', new Color(0, 255, 0, 255));

    Color.AddConstantColor('BLUE', new Color(0, 0, 255, 255));

    Color.AddConstantColor('AQUA', new Color(128, 255, 255, 255));

    Color.AddConstantColor('MAGENTA', new Color(128, 0, 128, 255));

    Color.AddConstantColor('YELLOW', new Color(255, 255, 0, 255));

    Color.AddConstantColor('ORANGE', new Color(255, 128, 0, 255));

    return Color;

  }).call(this);
  //@[EXTEND]
  return KDCore.Color = Color;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Color, DevLog, __TMP_LOGS__;
  Color = KDCore.Color;
  __TMP_LOGS__ = [];
  DevLog = class DevLog {
    constructor(prefix = "") {
      this.prefix = prefix;
      this._isShow = typeof DEV !== 'undefined';
      this._color = Color.BLACK;
      this._backColor = Color.WHITE;
      __TMP_LOGS__.push(this);
    }

    on() {
      this._isShow = true;
      return this;
    }

    off() {
      this._isShow = false;
      return this;
    }

    applyRandomColors() {
      this.applyRandomWithoutBackgroundColors();
      this.setBackColor(Color.Random());
      return this;
    }

    applyRandomWithoutBackgroundColors() {
      this.setColor(Color.Random());
      return this;
    }

    setColor(color) {
      this._color = color;
      return this;
    }

    setBackColor(backColor) {
      this._backColor = backColor;
      return this;
    }

    applyLibraryColors() {
      this.setColors(new Color(22, 120, 138, 0), Color.BLACK);
      return this;
    }

    setColors(color, backColor) {
      this.setColor(color);
      this.setBackColor(backColor);
      return this;
    }

    applyExtensionColors() {
      this.setColors(new Color(22, 143, 137, 0), Color.BLACK.getLightestColor(60));
      return this;
    }

    applyWarningColors() {
      this.setColors(Color.ORANGE, Color.BLACK.getLightestColor(100));
      return this;
    }

    p(text) {
      if (!this._isShow) {
        return;
      }
      if (text == null) {
        console.log("");
      }
      this._printText(text);
    }

    _printText(text) {
      text = this.prefix + " : " + text;
      if (this._isUsingColor()) {
        return this._printTextWithColors(text);
      } else {
        return console.log(text);
      }
    }

    _isUsingColor() {
      return this._color !== Color.BLACK || this._backColor !== Color.WHITE;
    }

    _printTextWithColors(text) {
      var args;
      args = ['%c' + text, `color: ${this._color.HEX} ; background: ${this._backColor.HEX};`];
      return window.console.log.apply(console, args);
    }

    static CreateForLib(library) {
      var dlog;
      dlog = new DevLog(library.name);
      dlog.applyLibraryColors();
      return dlog;
    }

    static EnableAllLogs() {
      return __TMP_LOGS__.forEach(function(log) {
        return log.on();
      });
    }

  };
  //@[EXTEND]
  return KDCore.DevLog = DevLog;
});


// Generated by CoffeeScript 2.6.1
// * Класс для глобального события игры (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.GEvent = class GEvent {
    constructor(name) {
      this.name = name;
      this.clear();
    }

    addListener(listener, isSingle = false) {
      if (listener == null) {
        return;
      }
      if (isSingle === true) {
        this.listeners = [listener];
      } else {
        this.listeners.push(listener);
      }
    }

    removeListener(listener) {
      if (listener == null) {
        return;
      }
      return this.listener.delete(listener);
    }

    call() {
      var i, l, len, ref;
      ref = this.listeners;
      for (i = 0, len = ref.length; i < len; i++) {
        l = ref[i];
        l();
      }
    }

    clear() {
      return this.listeners = [];
    }

  };
});


// Generated by CoffeeScript 2.6.1
// * Менеджер для управления глобальными событиями игры (GEvent) (НЕ события на карте)
KDCore.registerLibraryToLoad(function() {
  var GEventsManager;
  // * Данный менеджер глобальный, т.е. с ним работают ВСЕ плагины, которые его используют!
  GEventsManager = function() {};
  (function() {
    var _;
    _ = GEventsManager;
    // * Существует ли событие с данным именем
    _.isEventExists = function(gEventName) {
      return this._getEventByName(gEventName) != null;
    };
    // * Получить список всех зарегестрированных событий (имён)
    _.getAllEvents = function() {
      if (this.events == null) {
        return [];
      }
      return this.events.map(function(ev) {
        return ev.name;
      });
    };
    // * Зарегестрировать событие (используется только имя события)
    _.register = function(gEventName) {
      if (this.events == null) {
        this.events = [];
      }
      this.events.push(new KDCore.GEvent(gEventName));
    };
    // * Подписаться на событие (имя события) и слушатель
    // * если isSingle == true - то у события может быть только один исполнитель
    _.subscribeFor = function(evName, listener, isSingle = false) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.addListener(listener, isSingle) : void 0;
    };
    // * Подписаться на событие (уникально) для объекта
    // * Т.е. при вызове этого метода ещё раз, если объект
    // * уже подписан на событие, ничего не будет (без дубликатов)
    //? ВНИМАНИЕ ! Если объект подписался через subscribeForX, то
    // выполнив clear по данному evName, он уже не подпишится!
    _.subscribeForX = function(context, evName, listener) {
      var e, key;
      try {
        key = "__kdCoreGEvent_" + evName;
        if (context[key] == null) {
          this.subscribeFor(evName, listener);
          return context[key] = true;
        }
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    };
    // * Вызвать событие (по имени)
    _.call = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.call() : void 0;
    };
    _.clear = function(evName) {
      var ref;
      return (ref = this._getEventByName(evName)) != null ? ref.clear() : void 0;
    };
    _._getEventByName = function(name) {
      if (!this.events) {
        return null;
      }
      return this.events.find(function(ev) {
        return ev.name === name;
      });
    };
  })();
  //@[EXTEND]
  return KDCore.GEventsManager = GEventsManager;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  //?[DEPRECATED]
  return KDCore.ParametersManager = class ParametersManager {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this._cache = {};
      this._parameters = PluginManager.getPluginParametersByRoot(this.pluginName);
    }

    isLoaded() {
      return (this._parameters != null) && this._parameters.hasOwnProperty(this.pluginName);
    }

    isHasParameter(name) {
      return this._parameters[name] != null;
    }

    getString(name) {
      return this._parameters[name];
    }

    convertField(object, fieldName) {
      var e;
      try {
        object[fieldName] = JSON.parse(object[fieldName] || 'false');
      } catch (error) {
        e = error;
        console.error('Error while convert field ' + e.name);
        object[fieldName] = false;
      }
      return object;
    }

    convertImage(object, fieldName) {
      return object[fieldName] = this.loadImage(object[fieldName]);
    }

    loadImage(filename, smooth) {
      var e, path;
      try {
        if (filename) {
          path = filename.split('/');
          filename = path.last();
          path = path.first() + '/';
          return ImageManager.loadBitmap('img/' + path, filename, 0, smooth || true);
        } else {
          return ImageManager.loadEmptyBitmap();
        }
      } catch (error) {
        e = error;
        console.error(e);
        return ImageManager.loadEmptyBitmap();
      }
    }

    getFromCacheOrInit(name, func) {
      var object;
      if (!this.isInCache(name)) {
        if (func != null) {
          object = func.call(this);
          this.putInCache(name, object);
        }
      }
      return this.getFromCache(name);
    }

    isInCache(name) {
      return this._cache.hasOwnProperty(name);
    }

    putInCache(name, object) {
      return this._cache[name] = object;
    }

    getFromCache(name) {
      return this._cache[name];
    }

    getNumber(name) {
      var number;
      number = this.getObject(name);
      if (KDCore.SDK.isInt(number)) {
        return number;
      }
      return 0;
    }

    getObject(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || '{}');
      } else {
        return {};
      }
    }

    getBoolean(name) {
      if (this.isHasParameter(name)) {
        return JSON.parse(this.getString(name) || false);
      } else {
        return false;
      }
    }

    getBooleanFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getBooleanFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getNumberFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getNumberFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getStringFromCacheWithDefault(name, defaultValue) {
      if (this.isHasParameter(name)) {
        return this.getStringFromCache(name);
      } else {
        return defaultValue;
      }
    }

    getBooleanFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getBoolean(name);
      });
    }

    getNumberFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getNumber(name);
      });
    }

    getStringFromCache(name) {
      return this.getFromCacheOrInit(name, function() {
        return this.getString(name);
      });
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.ParamLoader = class ParamLoader {
    constructor(pluginName) {
      this.pluginName = pluginName;
      this.paramsRaw = PluginManager.getPluginParametersByRoot(this.pluginName);
      this.params = this.parseParameters(this.paramsRaw);
    }

    parseParameters(paramSet) {
      var clearKey, key, params, typeKey, value;
      params = {};
      for (key in paramSet) {
        value = paramSet[key];
        clearKey = this.parseKey(key);
        typeKey = this.parseKeyType(key);
        params[clearKey] = this.parseParamItem(typeKey, value);
      }
      return params;
    }

    parseKey(keyRaw) {
      return keyRaw.split(":")[0];
    }

    parseKeyType(keyRaw) {
      return keyRaw.split(":")[1];
    }

    // * Проверка, загружены ли параметры плагина
    isLoaded() {
      return (this.paramsRaw != null) && this.paramsRaw.hasOwnProperty(this.pluginName);
    }

    // * Имя параметра без ключа
    isHasParameter(paramName) {
      return this.params[paramName] != null;
    }

    
      // * Возвращает значение параметра (def - по умолчанию, если не найден)
    getParam(paramName, def) {
      var value;
      if (this.isHasParameter(paramName)) {
        value = this.params[paramName];
        if (value != null) {
          return value;
        }
      }
      return def;
    }

    // * Данные ключи должны идти после названия параметра через :
    // * Пример: @param ShowDelay:int, @param TestBool:bool
    // * Текстовые параметры, которые надо вернуть как есть, можно без типа (text, file, combo, ...)
    parseParamItem(type, item) {
      var e;
      if (type == null) {
        return item;
      }
      try {
        switch (type) {
          case "int":
          case "i":
            return Number(item);
          case "intA":
            return this.parseArray(item, "int");
          case "bool":
          case "b":
          case "e":
            return eval(item);
          case "struct":
          case "s":
            return this.parseStruct(item);
          case "structA":
            return this.parseStructArray(item);
          case "str":
            return item;
          case "strA":
            return this.parseArray(item, "str");
          case "note":
            return this.parseNote(item);
          case "css":
            return item.toCss();
          case "color":
            return KDCore.Color.FromHex(item);
          case "json":
          case "j":
            return this.parseJson(item);
          default:
            return item;
        }
      } catch (error) {
        e = error;
        console.warn(e);
        return item;
      }
    }

    parseArray(items, type) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseParamItem(type, p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseStruct(item) {
      var e, parsed;
      try {
        if (item == null) {
          return null;
        }
        if (!String.any(item)) {
          return null;
        }
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return this.parseParameters(parsed);
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return null;
    }

    parseStructArray(items) {
      var e, elements, i, len, p, parsed;
      try {
        elements = [];
        parsed = JsonEx.parse(items);
        for (i = 0, len = parsed.length; i < len; i++) {
          p = parsed[i];
          try {
            elements.push(this.parseStruct(p));
          } catch (error) {
            e = error;
            console.warn(e);
          }
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return elements;
    }

    parseNote(item) {
      var e, parsed;
      try {
        parsed = JsonEx.parse(item);
        if (parsed != null) {
          return parsed;
        }
      } catch (error) {
        e = error;
        console.warn(e);
      }
      return item;
    }

    parseJson(item) {
      var cx, e, element, elements, i, json, key, len, parsed, value;
      try {
        json = {};
        parsed = JsonEx.parse(item);
        elements = parsed.split('\n');
        for (i = 0, len = elements.length; i < len; i++) {
          element = elements[i];
          cx = "{" + element + "}";
          try {
            item = JsonEx.parse(cx);
            for (key in item) {
              value = item[key];
              json[key] = value;
            }
          } catch (error) {
            e = error;
            KDCore.warning("Parameter " + element + " have syntax errors, ignored");
          }
        }
        return json;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return null; // * Чтобы default value был возвращён
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Point;
  Point = (function() {
    class Point {
      constructor(_x = 0, _y = 0) {
        this._x = _x;
        this._y = _y;
      }

      clone() {
        return new Point(this._x, this._y);
      }

      toString() {
        return "[" + this._x + " ; " + this._y + "]";
      }

      isSame(anotherPoint) {
        return this.x === anotherPoint.x && this.y === anotherPoint.y;
      }

      convertToCanvas() {
        return new Point(Graphics.pageToCanvasX(this._x), Graphics.pageToCanvasY(this._y));
      }

      convertToMap() {
        return new Point($gameMap.canvasToMapX(this._x), $gameMap.canvasToMapY(this._y));
      }

      convertToScreen() {
        return new Point(this.screenX(), this.screenY());
      }

      screenX() {
        var t, tw;
        t = $gameMap.adjustX(this._x);
        tw = $gameMap.tileWidth();
        return Math.round(t * tw + tw / 2);
      }

      screenY() {
        var t, th;
        t = $gameMap.adjustY(this._y);
        th = $gameMap.tileHeight();
        return Math.round(t * th + th);
      }

      round() {
        return new Point(Math.round(this._x), Math.round(this._y));
      }

      floor() {
        return new Point(Math.floor(this._x), Math.floor(this._y));
      }

      mapPointOnScreen() {
        var nx, ny;
        nx = (this._x * $gameMap.tileWidth()) - ($gameMap.displayX() * $gameMap.tileWidth());
        ny = (this._y * $gameMap.tileHeight()) - ($gameMap.displayY() * $gameMap.tileHeight());
        return new Point(nx, ny);
      }

      multiplyBy(val) {
        return new Point(this._x * val, this._y * val);
      }

      simple() {
        return new PIXI.Point(this.x, this.y);
      }

      delta(point) {
        var dx, dy;
        dx = point.x - this._x;
        dy = point.y - this._y;
        return new KDCore.Point(dx, dy);
      }

      static _getEmpty() {
        if (Point._emptyPoint == null) {
          Point._emptyPoint = new Point(0, 0);
        }
        return Point._emptyPoint;
      }

    };

    Object.defineProperties(Point.prototype, {
      x: {
        get: function() {
          return this._x;
        },
        configurable: true
      },
      y: {
        get: function() {
          return this._y;
        },
        configurable: true
      }
    });

    Object.defineProperties(Point, {
      Empty: {
        get: function() {
          return Point._getEmpty();
        },
        configurable: false
      }
    });

    Array.prototype.toPoint = function() {
      return new Point(this[0], this[1]);
    };

    Sprite.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    Game_CharacterBase.prototype.toPoint = function() {
      return new Point(this.x, this.y);
    };

    return Point;

  }).call(this);
  //@[EXTEND]
  return KDCore.Point = Point;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  return KDCore.Sprite = (function(superClass) {
    //@[AUTO EXTEND]
    class Sprite extends superClass {
      constructor() {
        super(...arguments);
      }

      appear(step, delay = 0) {
        this.opacity = 0;
        this._opChanger = KDCore.Changer.CreateForOpacityUp(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      disapper(step, delay = 0) {
        this._opChanger = KDCore.Changer.CreateForOpacityDown(this, step, () => {
          this._opChanger = null;
          return this._updateOpChanger = function() {}; // * EMPTY
        }, false); // * Not autostart for Delay
        if (delay > 0) {
          this._opChanger.delay(delay);
        }
        this._opChanger.start();
        this._updateOpChanger = () => {
          var ref;
          return (ref = this._opChanger) != null ? ref.update() : void 0;
        };
      }

      assignTooltip(content, params) {
        if (this._tooltip != null) {
          this.removeChild(this._tooltip);
        }
        this._tooltip = new KDCore.UI.Sprite_UITooltip(params);
        this._tooltip.addContent(content);
        this.updateTooltip = this.updateTooltipBody;
      }

      destroyTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this.hideTooltip();
        this.removeChild(this._tooltip);
        this._tooltip = null;
        return this.updateTooltip = function() {}; // * EMPTY
      }

      showTooltip() {
        if (this._tooltip == null) {
          return;
        }
        // * Position 0, 0, becouse cursorRelative by default
        this._tooltip.activateTooltip(0, 0, this);
      }

      hideTooltip() {
        if (this._tooltip == null) {
          return;
        }
        this._tooltip.deactivateTooltip();
      }

      //@[DYNAMIC]
      updateTooltip() {} // * EMPTY

      updateTooltipBody() {
        if (this.isUnderMouse()) {
          if (this._tooltip.isTooltipActive()) {

          } else {
            if (this.isReady() && this.visible === true && this.opacity >= 255) {
              return this.showTooltip();
            }
          }
        } else {
          if (this._tooltip.isTooltipActive()) {
            return this.hideTooltip();
          }
        }
      }

      update() {
        super.update();
        this._updateOpChanger();
        return this.updateTooltip();
      }

      //@[DYNAMIC]
      _updateOpChanger() {} // * EMPTY

      b() {
        return this.bitmap;
      }

      clear() {
        return this.bitmap.clear();
      }

      add(child) {
        return this.addChild(child);
      }

      bNew(w, h) {
        if (h == null) {
          h = w;
        }
        return this.bitmap = new Bitmap(w, h);
      }

      bImg(filename, sourceFolder) {
        var getterFunc;
        getterFunc = function(filename) {
          return ImageManager.loadPicture(filename);
        };
        if (sourceFolder != null) {
          getterFunc = function(filename) {
            return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
          };
        }
        return this.bitmap = getterFunc(filename);
      }

      onReady(method) {
        if (method != null) {
          return this.bitmap.addLoadListener(method);
        }
      }

      drawText() {
        return this.bitmap.drawText(...arguments);
      }

      drawTextFull(text, position = "center") {
        if (this.textSettingsPosition != null) {
          position = this.textSettingsPosition;
        }
        return this.bitmap.drawTextFull(text, position);
      }

      //?DEPRECATED
      drawTextWithSettings(text) {
        this.clear();
        this.drawTextFull(text, this.textSettingsPosition);
      }

      //? x, y, icon, size
      drawIcon() {
        return this.bitmap.drawIcon(...arguments);
      }

      moveByJson(settings) {
        var pos;
        pos = KDCore.Utils.getPositionPointFromJSON(settings);
        return this.move(pos.x, pos.y);
      }

      applyTextSettingsByJson(sprite, settings) {
        this.applyTextSettingsByExtraSettings(sprite, settings.text);
      }

      applyTextSettingsByExtraSettings(sprite, s) {
        sprite.move(s.marginX, s.marginY);
        sprite.b().fontSize = s.fontSize;
        sprite.b().textColor = KDCore.Color.FromHex(s.textColor).CSS;
        sprite.b().outlineWidth = s.outlineWidth;
        if (s.outlineColor != null) {
          sprite.b().outlineColor = KDCore.Color.FromHex(s.outlineColor).CSS;
        }
        if (s.fontFace != null) {
          sprite.b().fontFace = s.fontFace;
        }
        sprite.b().fontItalic = s.fontItalic;
        sprite.visible = s.visible;
      }

      isReady() {
        var i, j, ref;
        if (this.bitmap != null) {
          if (!this.bitmap.isReady()) {
            return false;
          }
        }
        for (i = j = 0, ref = this.children.length; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          if (!this.children[i].bitmap.isReady()) {
            return false;
          }
        }
        return true;
      }

      isCheckAlpha() {
        return false;
      }

      inPosition(point) {
        var e, gx, gy, pixel, result, x, y;
        result = this.isContainsPoint(point);
        if (result && this.isCheckAlpha()) {
          try {
            ({x, y} = point);
            gx = KDCore.SDK.toGlobalCoord(this, 'x');
            gy = KDCore.SDK.toGlobalCoord(this, 'y');
            pixel = this.bitmap.getAlphaPixel(x - gx, y - gy);
            result = pixel > 100;
          } catch (error) {
            e = error;
            KDCore.warning(e);
            result = true; // * ignor Alpha if error
          }
        }
        return result;
      }

      isUnderMouse() {
        return this.inPosition(TouchInput);
      }

      // * Из параметров плагина
      applyFontParam(font) {
        var b;
        if (font == null) {
          return;
        }
        b = this.b();
        if (font.size != null) {
          b.fontSize = font.size;
        }
        if (!String.isNullOrEmpty(font.face)) {
          b.fontFace = font.face;
        }
        if (font.italic != null) {
          b.fontItalic = font.italic;
        }
      }

      applyOutlineParam(outline) {
        var b;
        if (outline == null) {
          return;
        }
        b = this.b();
        if (outline.width != null) {
          b.outlineWidth = outline.width;
        }
        if (!String.isNullOrEmpty(outline.color)) {
          b.outlineColor = outline.color;
        }
      }

      static FromImg(filename, sourceFolder) {
        var s;
        s = new KDCore.Sprite();
        s.bImg(filename, sourceFolder);
        return s;
      }

      static FromBitmap(w, h) {
        var s;
        s = new KDCore.Sprite();
        s.bNew(w, h);
        return s;
      }

      static FromTextSettings(settings) {
        var s;
        s = KDCore.Sprite.FromBitmap(settings.textBoxWidth, settings.textBoxHeight);
        s.applyTextSettingsByExtraSettings(s, settings);
        s.textSettingsPosition = settings.position;
        return s;
      }

      // * Загрузчик из параметров плагина (безопасный)
      static FromParams(pluginParams) {
        var e, h, margins, s, size, w;
        try {
          size = pluginParams.size;
          ({w, h} = size);
          try {
            if (String.any(w)) {
              if (isFinite(w)) {
                w = Number(w);
              } else {
                w = eval(w);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            w = 100;
          }
          try {
            if (String.any(h)) {
              if (isFinite(h)) {
                h = Number(h);
              } else {
                h = eval(h);
              }
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
            h = 100;
          }
          s = KDCore.Sprite.FromBitmap(w, h);
          s.textSettingsPosition = pluginParams.alignment;
          margins = pluginParams.margins;
          if (margins != null) {
            s.move(margins.x, margins.y);
          }
          s.applyFontParam(pluginParams.font);
          s.applyOutlineParam(pluginParams.outline);
          if (!String.isNullOrEmpty(pluginParams.textColor)) {
            s.b().textColor = pluginParams.textColor;
          }
          if (pluginParams.visible != null) {
            s.visible = pluginParams.visible;
          }
          return s;
        } catch (error) {
          e = error;
          console.warn('Something wrong with Text Settings!', e);
          return KDCore.Sprite.FromBitmap(60, 30);
        }
      }

    };

    return Sprite;

  }).call(this, Sprite);
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  //@[AUTO EXTEND]
  return KDCore.TimedUpdate = class TimedUpdate {
    constructor(interval, method) {
      this.interval = interval;
      this.method = method;
      this._timer = 0;
      this._once = false;
    }

    update() {
      if (this.interval == null) {
        return;
      }
      if (this._timer++ >= this.interval) {
        this.call();
        this._timer = 0;
        if (this._once === true) {
          return this.stop();
        }
      }
    }

    once() {
      return this._once = true;
    }

    onUpdate(method) {
      this.method = method;
    }

    stop() {
      return this.interval = null;
    }

    isAlive() {
      return this.interval != null;
    }

    // * Рандомизировать интервал @interval (-min, +max)
    applyTimeRange(min, max) {
      var value;
      if (!this.isAlive()) {
        return;
      }
      value = KDCore.SDK.rand(min, max);
      return this.interval += value;
    }

    call() {
      if (this.method != null) {
        return this.method();
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  
    // * Button (Sprite_XButton)

    //@[AUTO EXTEND]
  //?DEPRECATED
  return KDCore.Button = class Button extends Sprite {
    constructor() {
      super();
      this._mouseIn = false;
      this._touching = false;
      this._slowUpdateActive = false;
      this._localMode = false;
      this._images = [];
      this._checkAlpha = false;
      this._textSprite = null;
      this._textPosition = 0;
      this._override = false; // * TouchClick in game messages not work anymore if TRUE
      this._clickHandlers = [];
      this._manualHided = false;
      this._manualDisabled = false;
      this._condition = null; // * Условие для Visible
      this._condition2 = null; // * Условие для Enable \ Disable
      this._disabled = false;
      this._infoData = null;
      this._isNeedShowText = false;
      return;
    }

    isMouseInButton() {
      return this._mouseIn === true;
    }

    isActive() {
      return this.visible === true;
    }

    activateSlowUpdate() {
      return this._slowUpdateActive = true;
    }

    setLocalMode() {
      this._realX = this.x;
      this._realY = this.y;
      return this._localMode = true;
    }

    setAlphaMode() {
      return this._checkAlpha = true;
    }

    // * above, below
    setTextPosition(position) {
      return this._textPosition = position;
    }

    setHelpText(text, size) {
      return this._createText(text, size);
    }

    setInfoData(data) {
      return this._infoData = data;
    }

    setOverrideMode() {
      return this._override = true;
    }

    isOverride() {
      return this._override === true && this.isActive() && this.touchInButton();
    }

    isDisabled() {
      return this._disabled === true;
    }

    isEnabled() {
      return !this.isDisabled();
    }

    isNeedShowText() {
      return this._isNeedShowText === true;
    }

    addClickHandler(method) {
      return this._clickHandlers.push(method);
    }

    clearClickHandlers() {
      return this._clickHandlers = [];
    }

    isLocalMode() {
      return this._localMode === true;
    }

    setCondition(method) {
      return this._condition = method;
    }

    setConditionForDisable(method) {
      return this._condition2 = method;
    }

    getInfoData() {
      return this._infoData;
    }

    simulateClick() { //?NEW
      return this.applyClickedState();
    }

    simulateClickManual() { //?NEW
      this.simulateClick();
      return setTimeout((() => {
        try {
          return this.applyNormalState();
        } catch (error) {

        }
      }), 50);
    }

    prepare() { //?NEW
      return this.slowUpdate();
    }

    realX() {
      if (this.isLocalMode()) {
        return this._realX;
      } else {
        return this.x;
      }
    }

    realY() {
      if (this.isLocalMode()) {
        return this._realY;
      } else {
        return this.y;
      }
    }

    show() {
      this.visible = true;
      return this._manualHided = false;
    }

    hide() {
      this.visible = false;
      return this._manualHided = true;
    }

    disable() {
      this._disabled = true;
      this._manualDisabled = true;
      this.refreshEnDisState();
      return this._mouseIn = false;
    }

    enable() {
      this._disabled = false;
      this._manualDisabled = false;
      return this.refreshEnDisState();
    }

    update() {
      super.update();
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseClick();
      this.updatePosition();
      if (!this._slowUpdateActive) {
        this.slowUpdate();
      }
      return this.updateComplexTextVisible();
    }

    slowUpdate() {
      if (this._destroyed === true) {
        return;
      }
      this.updateMouseTracking();
      this.updateConditionForVisible();
      return this.updateConditionForEnabling();
    }

    updateMouseTracking() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.cursorInButton()) {
        this._onMouseEnter();
        return this._mouseIn = true;
      } else {
        this._onMouseLeave();
        return this._mouseIn = false;
      }
    }

    // * In MZ TouchInput always have X,Y
    cursorInButton() {
      return this.touchInButton();
    }

    xyInButton(x, y) {
      var inRect, rect, rx, ry;
      rx = KDCore.SDK.toGlobalCoord(this, 'x');
      ry = KDCore.SDK.toGlobalCoord(this, 'y');
      rect = new PIXI.Rectangle(rx, ry, this._realWidth(), this._realHeight());
      inRect = rect.contains(x, y);
      if (inRect === true && this._checkAlpha === true) {
        return this._checkAlphaPixel(x - rx, y - ry);
      } else {
        return inRect;
      }
    }

    _realWidth() {
      if (this._hasImage()) {
        return this._mainImage().width;
      } else {
        return this.width;
      }
    }

    _hasImage() {
      return this._mainImage() != null;
    }

    _mainImage() {
      return this._images[0];
    }

    _realHeight() {
      if (this._hasImage()) {
        return this._mainImage().height;
      } else {
        return this.height;
      }
    }

    _checkAlphaPixel(x, y) {
      var pixel;
      pixel = this._hasImage() ? this._mainImage().bitmap.getAlphaPixel(x, y) : this.bitmap.getAlphaPixel(x, y);
      return pixel >= 200;
    }

    _onMouseEnter() {
      if (this._mouseIn === true) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyCoverState();
      }
      this._showText();
      if (this.getInfoData() != null) {
        return this._startComplexTimer();
      }
    }

    _onMouseLeave() {
      if (this._mouseIn === false) {
        return;
      }
      if (!this.isDisabled()) {
        this.applyNormalState();
      }
      this._hideText();
      return this._stopComplexTimer();
    }

    _showText() {
      if (this._textSprite == null) {
        return;
      }
      this._updateTextPosition();
      return this._textSprite.visible = true;
    }

    _hideText() {
      if (this._textSprite == null) {
        return;
      }
      return this._textSprite.visible = false;
    }

    _startComplexTimer() {
      this._stopComplexTimer();
      return this._cTimer = setTimeout((() => {
        if (this._mouseIn === true) {
          return this._isNeedShowText = true;
        }
      }), 1000);
    }

    _stopComplexTimer() {
      if (this._cTimer != null) {
        clearTimeout(this._cTimer);
      }
      return this._isNeedShowText = false;
    }

    updateMouseClick() {
      if (!this.isActive()) {
        this._unTouch();
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.touchInButton()) {
        this._touching = true;
        this.applyClickedState();
      }
      if (this._touching === true) {
        if (TouchInput.isReleased() || !this.touchInButton()) {
          this._unTouch();
          if (TouchInput.isReleased()) {
            return this.callClickHandler();
          }
        }
      }
    }

    _unTouch() {
      this._touching = false;
      if (this.touchInButton()) {
        return this.applyCoverState();
      } else {
        return this.applyNormalState();
      }
    }

    touchInButton() {
      return this.xyInButton(TouchInput.x, TouchInput.y);
    }

    callClickHandler() {
      if (this._clickHandlers.length > 0) {
        return this._clickHandlers.forEach(function(method) {
          return method();
        });
      }
    }

    updatePosition() {
      var p;
      if (!this._localMode) {
        return;
      }
      p = new KDCore.Point(this._realX, this._realY);
      return this.move(p.screenX(), p.screenY());
    }

    updateConditionForVisible() {
      var result;
      if (this._condition == null) {
        return;
      }
      if (this._manualHided === true) {
        return;
      }
      try {
        result = this._condition();
        return this.visible = !result;
      } catch (error) {
        console.warn('wrong condition in button');
        return this.visible = true;
      }
    }

    updateConditionForEnabling() {
      if (!this._condition2) {
        return;
      }
      if (this._manualDisabled === true) {
        return;
      }
      try {
        this._disabled = this._condition2();
        return this.refreshEnDisState();
      } catch (error) {
        console.warn('wrong condition in button for enable state');
        return this.disable();
      }
    }

    setButtonImages(img1, img2, img3, img4) {
      if (this._images != null) {
        this._images.forEach(function(img) {
          if (img != null) {
            return img.parent.removeChild(img);
          }
        });
      }
      this._images = [new Sprite(img1), img2 != null ? new Sprite(img2) : void 0, img3 != null ? new Sprite(img3) : void 0, img4 != null ? new Sprite(img4) : void 0];
      this._images.forEach((img) => {
        if (img != null) {
          return this.addChild(img);
        }
      });
      return this.applyNormalState();
    }

    applyNormalState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[0]) != null ? ref.visible = true : void 0;
    }

    refreshImages() {
      return this._images.forEach(function(img) {
        return img != null ? img.visible = false : void 0;
      });
    }

    applyCoverState() {
      this.refreshImages();
      if (this._images[1] != null) {
        return this._images[1].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    applyClickedState() {
      this.refreshImages();
      if (this._images[2] != null) {
        return this._images[2].visible = true;
      } else {
        return this.applyNormalState();
      }
    }

    _createText(text, size) {
      var h, w;
      if (this._textSprite) {
        this.removeChild(this._textSprite);
      }
      w = Math.round(((size / 10) + 1) * 5 * text.length);
      h = size + 4;
      this._textSprite = new Sprite(new Bitmap(w, h));
      this._textSprite.bitmap.fontSize = size;
      this._textSprite.bitmap.drawText(text, 0, h / 2, w, 1, 'center');
      this._textSprite.visible = false;
      return this.addChild(this._textSprite);
    }

    _updateTextPosition() {
      var nx, ny;
      if (!this._textSprite) {
        return;
      }
      nx = this._realWidth() / 2 - this._textSprite.width / 2;
      if (this._textPosition === 0) {
        ny = -this._textSprite.height;
      } else {
        ny = this._realHeight() + this._textSprite.height / 2;
      }
      return this._textSprite.move(nx, ny);
    }

    applyDisableState() {
      var ref;
      this.refreshImages();
      return (ref = this._images[3]) != null ? ref.visible = true : void 0;
    }

    refreshEnDisState() {
      if (this.isDisabled()) {
        this.applyDisableState();
        return this._hideText();
      } else {
        if (this._mouseIn === false) {
          return this.applyNormalState();
        }
      }
    }

    //else
    //    do @applyCoverState
    updateComplexTextVisible() {}

    applyScale(mod) {
      var i, img, len, ref;
      ref = this._images;
      for (i = 0, len = ref.length; i < len; i++) {
        img = ref[i];
        if (img != null) {
          img.scale.x = mod;
          img.scale.y = mod;
        }
      }
    }

    static FromSet(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img0, img0);
      return button;
    }

    static FromSetFull(imgName, sourceFolder = null) {
      var button, getterFunc, img0, img1, img2, img3;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder != null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap("img/" + sourceFolder + "/", filename);
        };
      }
      img0 = getterFunc(imgName + "_00");
      img1 = getterFunc(imgName + "_01");
      img2 = getterFunc(imgName + "_02");
      img3 = getterFunc(imgName + "_03");
      button = new KDCore.Button();
      button.setButtonImages(img0, img1, img2, img3);
      return button;
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroup;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)

    //rev 07.10.21
  Sprite_ButtonsGroup = class Sprite_ButtonsGroup extends KDCore.Sprite {
    // buttonsArray = [
    //       {image: NAME, position: [X,Y]}, ...
    //    ]
    constructor(buttonsArray, activeIndex, clickCallback) {
      var button, i, len;
      super();
      this.clickCallback = clickCallback;
      this._buttons = [];
      for (i = 0, len = buttonsArray.length; i < len; i++) {
        button = buttonsArray[i];
        this._createButton(button);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroup.prototype;
    _._createButton = function({image, position}) {
      var btn, index, method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      index = this._buttons.length;
      btn = new KDCore.ButtonM(image, true, "Alpha");
      btn.move(position);
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this._buttons.push(btn);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroup = Sprite_ButtonsGroup;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_ButtonsGroupHandler;
  // * Класс для реализации набора кнопок переключателей (Tabs)
  // * Когда только одна кнопка может быть нажата (выбрана)
  // * В отличии от Sprite_ButtonsGroup, принимает массив
  // * уже созданных кнопок

    //rev 10.07.22
  Sprite_ButtonsGroupHandler = class Sprite_ButtonsGroupHandler extends KDCore.Sprite {
    // _buttons = [Button object with enable, disable, isEnable, addClickHandler methods]
    constructor(_buttons, clickCallback, activeIndex = 0) {
      var button, i, index, len, ref;
      super();
      this._buttons = _buttons;
      this.clickCallback = clickCallback;
      ref = this._buttons;
      for (index = i = 0, len = ref.length; i < len; index = ++i) {
        button = ref[index];
        this._processButton(button, index);
      }
      this._onButtonClick(activeIndex);
      return;
    }

    getSelectedIndex() {
      return this._buttons.findIndex(function(btn) {
        return !btn.isEnabled();
      });
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = Sprite_ButtonsGroupHandler.prototype;
    _._processButton = function(btn, index) {
      var method;
      // * Так как кнопки работают как переключатели, то 03 должен быть всегда
      method = () => {
        return this._onButtonClick(index);
      };
      btn.addClickHandler(method);
      this.add(btn);
    };
    _._onButtonClick = function(index = 0) {
      var ref;
      this._resetAllButtons();
      if ((ref = this._buttons[index]) != null) {
        ref.disable(); // * Нажата
      }
      if (this.clickCallback != null) {
        this.clickCallback(index);
      }
    };
    _._resetAllButtons = function() {
      var btn, i, len, ref;
      ref = this._buttons;
      for (i = 0, len = ref.length; i < len; i++) {
        btn = ref[i];
        if (btn != null) {
          btn.enable();
        }
      }
    };
  })();
  // ■ END PRIVATE
  //---------------------------------------------------------------------------
  return KDCore.Sprite_ButtonsGroupHandler = Sprite_ButtonsGroupHandler;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad((function() {
  var Sprite_TilingFrame;
  Sprite_TilingFrame = class Sprite_TilingFrame extends KDCore.Sprite {
    constructor(width, height, skinBitmap) {
      super();
      this.width = width;
      this.height = height;
      this.skinBitmap = skinBitmap;
      this._createParts();
      this._refreshAll();
    }

    _createParts() {
      var i, j;
      this.backSprite = new Sprite();
      this.addChild(this.backSprite);
      this.content = new Sprite();
      this.addChild(this.content);
      this._outFrame = new Sprite();
      for (i = j = 0; j < 8; i = ++j) {
        this._outFrame.addChild(new Sprite());
      }
      return this.addChild(this._outFrame);
    }

    // * Отступ, чтобы за рамку не выходить
    _fillPadding() {
      return 2;
    }

    // * Размер частей на картинке
    _fillImagePartWidth() {
      return 96;
    }

    _fillImagePartHeight() {
      return 96;
    }

    // * Толщина рамки
    _frameThickness() {
      return 12;
    }

    _refreshAll() {
      this._refreshBack();
      return this._refreshTFrame();
    }

    _refreshBack() {
      var fh, fw, h, m, sprite, w;
      m = this._fillPadding();
      w = Math.max(0, this.width - m * 2);
      h = Math.max(0, this.height - m * 2);
      sprite = this.backSprite;
      sprite.bitmap = this.skinBitmap;
      // * Координаты фона из картинки
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      sprite.setFrame(0, 0, fw, fh);
      sprite.move(m, m);
      sprite.scale.x = w / fw;
      return sprite.scale.y = h / fh;
    }

    _refreshTFrame() {
      var drect, fh, fw, j, len, m, ref, spr, srect;
      fw = this._fillImagePartWidth();
      fh = this._fillImagePartHeight();
      // * Положение назначения
      drect = {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height
      };
      // * Координаты рамки на картинке
      srect = {
        x: fw,
        y: 0,
        width: fw,
        height: fh
      };
      m = this._frameThickness(); // * Толщина
      ref = this._outFrame.children;
      for (j = 0, len = ref.length; j < len; j++) {
        spr = ref[j];
        spr.bitmap = this.skinBitmap;
      }
      if (KDCore.isMZ()) {
        Window.prototype._setRectPartsGeometry.call(this, this._outFrame, srect, drect, m);
      } else {
        this._setRectPartsGeometry(this._outFrame, srect, drect, m);
      }
    }

    // * Этот метод существует в MZ, но нет в MV
    //? From MZ
    _setRectPartsGeometry(sprite, srect, drect, m) {
      var child, children, dh, dmh, dmw, dw, dx, dy, j, len, sh, smh, smw, sw, sx, sy;
      sx = srect.x;
      sy = srect.y;
      sw = srect.width;
      sh = srect.height;
      dx = drect.x;
      dy = drect.y;
      dw = drect.width;
      dh = drect.height;
      smw = sw - m * 2;
      smh = sh - m * 2;
      dmw = dw - m * 2;
      dmh = dh - m * 2;
      children = sprite.children;
      sprite.setFrame(0, 0, dw, dh);
      sprite.move(dx, dy);
      // corner
      children[0].setFrame(sx, sy, m, m);
      children[1].setFrame(sx + sw - m, sy, m, m);
      children[2].setFrame(sx, sy + sw - m, m, m);
      children[3].setFrame(sx + sw - m, sy + sw - m, m, m);
      children[0].move(0, 0);
      children[1].move(dw - m, 0);
      children[2].move(0, dh - m);
      children[3].move(dw - m, dh - m);
      // edge
      children[4].move(m, 0);
      children[5].move(m, dh - m);
      children[6].move(0, m);
      children[7].move(dw - m, m);
      children[4].setFrame(sx + m, sy, smw, m);
      children[5].setFrame(sx + m, sy + sw - m, smw, m);
      children[6].setFrame(sx, sy + m, m, smh);
      children[7].setFrame(sx + sw - m, sy + m, m, smh);
      children[4].scale.x = dmw / smw;
      children[5].scale.x = dmw / smw;
      children[6].scale.y = dmh / smh;
      children[7].scale.y = dmh / smh;
      // center
      if (children[8] != null) {
        children[8].setFrame(sx + m, sy + m, smw, smh);
        children[8].move(m, m);
        children[8].scale.x = dmw / smw;
        children[8].scale.y = dmh / smh;
      }
      for (j = 0, len = children.length; j < len; j++) {
        child = children[j];
        child.visible = dw > 0 && dh > 0;
      }
    }

  };
  return KDCore.Sprite_TilingFrame = Sprite_TilingFrame;
}));


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Window_ExtTextLineBase;
  // * Данное окно используется как основа для Sprite_UITextExt
  //rev 07.10.21
  Window_ExtTextLineBase = class Window_ExtTextLineBase extends Window_Base {
    constructor(rect, fontSettings) {
      super(rect);
      this.fontSettings = fontSettings;
      this.createContents();
      // * Всегда прозрачное окно
      this.setBackgroundType(2);
    }

    // * Нет отступов
    updatePadding() {
      return this.padding = 0;
    }

    // * Нет отступов
    itemPadding() {
      return 0;
    }

    textPadding() {
      return 0;
    }

    standardPadding() {
      return 0;
    }

    contentsWidth() {
      return this.width;
    }

    contentsHeight() {
      return this.height;
    }

    // * Более гибкая настройка размера текста при { }
    makeFontBigger() {
      return this.contents.fontSize += 1;
    }

    makeFontSmaller() {
      if (this.contents.fontSize > 1) {
        return this.contents.fontSize -= 1;
      }
    }

    // * Применение своих шрифта и размера текста
    resetFontSettings() {
      super.resetFontSettings();
      if (this.fontSettings == null) {
        return;
      }
      if (String.any(this.fontSettings.face)) {
        this.contents.fontFace = this.fontSettings.face;
      }
      if (this.fontSettings.size > 0) {
        this.contents.fontSize = this.fontSettings.size;
      }
      if (this.fontSettings.italic != null) {
        this.contents.fontItalic = this.fontSettings.italic;
      }
    }

  };
  return KDCore.Window_ExtTextLineBase = Window_ExtTextLineBase;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button M
  //------------------------------------------------------------------------------
  //@[AUTO EXTEND]
  // * Button Mini - упрощённый класс Sprite_XButton (KDCore.Button)

    // * Принимает название файла изображения кнопки без _00
  // * Названия изображения должны быть в стандартном формате _00, _01, [_03]
  // * _02 - не используются в этом классе

    // * Класс использует глобальную временную переменную для определения находится ли мышь в зоне кнопки

    //TODO: ADD ALPHA CHECK!

    // * Если isFull - true, значит нужен _03
  KDCore.ButtonM = class ButtonM extends KDCore.Sprite {
    constructor(filename, isFull = false, sourceFolder = null) {
      super();
      this._bitmaps = [];
      this._disabled = false;
      this._isTriggered = false;
      // * Когда произошло нажатие на кнопку
      this._handler = null;
      this._isCanBeClicked = true;
      this._isManualHoverMode = false;
      this._isManualSelected = false;
      this._loadBitmaps(filename, isFull, sourceFolder);
      this._setImageState(0);
      this._createThread();
    }

    setManualHover() {
      return this._isManualHoverMode = true;
    }

    disableManualHover() {
      return this._isManualHoverMode = false;
    }

    setManualSelected(_isManualSelected) {
      this._isManualSelected = _isManualSelected;
    }

    enableClick() {
      return this._isCanBeClicked = true;
    }

    disableClick() {
      return this._isCanBeClicked = false;
    }

    desaturate() {
      this.filters = [new PIXI.filters.ColorMatrixFilter()];
      this.filters[0].desaturate();
    }

    isMouseIn() {
      if (this._isManualHoverMode === true) {
        return this._isManualSelected;
      } else {
        return this.isUnderMouse() && this.visible === true;
      }
    }

    isActive() {
      if (this._isCanBeClicked === false) {
        return false;
      }
      if (this.parent != null) {
        return this.parent.visible === true && this.visible === true;
      } else {
        return this.visible === true;
      }
    }

    isDisabled() {
      return this._disabled === true;
    }

    addClickHandler(_handler) {
      this._handler = _handler;
    }

    clearClickHandler() {
      return this._handler = null;
    }

    // * Воспроизводит визуальный эффект нажатия
    simulateClick() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (this.isMouseIn()) {
        return;
      }
      this._startSimulation();
    }

    isEnabled() {
      return !this.isDisabled();
    }

    refreshState(isEnable = true) {
      if (isEnable === true) {
        if (this.isDisabled()) {
          this.enable();
        }
      } else {
        if (this.isEnabled()) {
          this.disable();
        }
      }
    }

    disable() {
      this._disabled = true;
      return this._setImageState(2);
    }

    enable() {
      this._disabled = false;
      return this._setImageState(0);
    }

    click() {
      if (this._handler != null) {
        return this._handler();
      }
    }

    update() {
      super.update();
      return this._updateMain();
    }

  };
  return (function() {    
    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ ButtonM Implementation
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _, alias_SM_isAnyButtonPressed, alias_SM_onMapLoaded;
    //@[DEFINES]
    _ = KDCore.ButtonM.prototype;
    _._loadBitmaps = function(filename, isFull = false, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(filename + '_00'));
      this._bitmaps.push(getterFunc(filename + '_01'));
      if (isFull) {
        this._bitmaps.push(getterFunc(filename + '_03'));
      }
    };
    _._getGetter = function(sourceFolder = null) {
      var getterFunc;
      getterFunc = function(filename) {
        return ImageManager.loadPicture(filename);
      };
      if (sourceFolder !== null) {
        getterFunc = function(filename) {
          return ImageManager.loadBitmap('img/' + sourceFolder + '/', filename);
        };
      }
      return getterFunc;
    };
    _._setImageState = function(index = 0) {
      if (this._bitmaps[index] == null) {
        index = 0;
      }
      this.bitmap = this._bitmaps[index];
      this._lastState = index;
    };
    _._createThread = function() {
      this.hoverThread = new KDCore.TimedUpdate(3, this._updateHover.bind(this));
      this.hoverThread.applyTimeRange(-1, 1);
      this.hoverThread.call();
    };
    //?[DYNAMIC]
    _._updateMain = function() {
      this._updateMouseLogic();
      if (!this.isActive()) {
        if (($gameTemp.kdButtonUnderMouse != null) && $gameTemp.kdButtonUnderMouse === this) {
          return $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseLogic = function() {
      this.hoverThread.update();
      return this._updateMouseClick();
    };
    _._updateHover = function() {
      if (!this.isActive()) {
        return;
      }
      // * чтобы эффект нажатия не прекратить
      if (this._isTriggered === true) {
        return;
      }
      if (this.isMouseIn()) {
        if (this._lastState !== 1) {
          if (!this.isDisabled()) {
            this._setImageState(1);
          }
          $gameTemp.kdButtonUnderMouse = this;
        }
      } else {
        if (this._lastState !== 0) {
          if (!this.isDisabled()) {
            this._setImageState(0);
          }
          if ($gameTemp.kdButtonUnderMouse === this) {
            $gameTemp.kdButtonUnderMouse = null;
          }
        } else if ($gameTemp.kdButtonUnderMouse === this) {
          $gameTemp.kdButtonUnderMouse = null;
        }
      }
    };
    _._updateMouseClick = function() {
      if (!this.isActive()) {
        return;
      }
      if (this.isDisabled()) {
        return;
      }
      if (TouchInput.isTriggered() && this.isMouseIn()) {
        this._isTriggered = true;
        this._setImageState(0);
      }
      if (this._isTriggered === true) {
        if (TouchInput.isReleased()) {
          this._isTriggered = false;
          if (this.isMouseIn()) {
            this.click();
          }
        }
      }
    };
    _._startSimulation = function() {
      this._setImageState(1);
      this._simulateThread = new KDCore.TimedUpdate(10, () => {
        return this._setImageState(0);
      });
      this._simulateThread.once();
      return this._updateMain = this._updateMouseClickSimulated;
    };
    _._updateMouseClickSimulated = function() {
      this._simulateThread.update();
      if (!this._simulateThread.isAlive()) {
        this._simulateThread = null;
        this._updateMain = this._updateMouseLogic;
      }
    };
    // * Теперь при нажатии на любую кнопку, игрок не будет ходить по карте

    //@[ALIAS]
    alias_SM_isAnyButtonPressed = Scene_Map.prototype.isAnyButtonPressed;
    Scene_Map.prototype.isAnyButtonPressed = function() {
      if ($gameTemp.kdButtonUnderMouse != null) {
        return true;
      } else {
        return alias_SM_isAnyButtonPressed.call(this);
      }
    };
    //TODO: Добавить доп. проверку?
    //@[ALIAS]
    alias_SM_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function() {
      $gameTemp.kdButtonUnderMouse = null;
      setTimeout((function() {
        return $gameTemp.kdButtonUnderMouse = null;
      }), 50);
      return alias_SM_onMapLoaded.call(this);
    };
  })();
});

// ■ END ButtonM Implementation
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Button Mini User - класс с определением файла каждого состояния отдельно
  // * Принимает теже аргументы, только заместо имени файла, три изображения (имени)
  // ? states = { main, hover, disabled }
  return KDCore.ButtonMU = class ButtonMU extends KDCore.ButtonM {
    constructor() {
      super(...arguments);
    }

    //$[OVER]
    _loadBitmaps(states, isFull = true, sourceFolder = null) {
      var getterFunc;
      getterFunc = this._getGetter(sourceFolder);
      this._bitmaps.push(getterFunc(states.main));
      this._bitmaps.push(getterFunc(states.hover));
      // * Optional 03
      if (String.any(states.disabled)) {
        this._bitmaps.push(getterFunc(states.disabled));
      }
    }

  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var Sprite_TilingLine;
  Sprite_TilingLine = class Sprite_TilingLine extends KDCore.Sprite_TilingFrame {
    constructor() {
      super(...arguments);
    }

    //$[OVER BASE ALL BELOW]
    _fillPadding() {
      return 0;
    }

    _refreshTFrame() {} // * EMPTY

    _fillImagePartWidth() {
      return 4;
    }

    _fillImagePartHeight() {
      return 26;
    }

  };
  return KDCore.Sprite_TilingLine = Sprite_TilingLine;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Пространство имён для всех UIElements
  KDCore.UI = KDCore.UI || {};
  (function() {    // * Общий класс для всех UI элементов
    //?rev 13.10.20
    var Sprite_UIElement;
    Sprite_UIElement = (function() {
      // * ABSTRACT значит что класс сам по себе ничего не создаёт, не хранит данные
      //@[ABSTRACT]
      class Sprite_UIElement extends KDCore.Sprite {
        constructor(params) {
          super();
          this.params = params;
          this._init();
        }

        // * Стандартный набор настроек
        defaultParams() {
          return {
            visible: true
          };
        }

        // * Общий метод (есть у всех элементов)
        // * По умолчанию вызывает drawText, но потомки могут переопределить
        draw() {
          return this.drawText(...arguments);
        }

        // * Общий метод
        drawText() {} // * EMPTY

        
          // * Если изначально невидимый (из параметров), то не активный вообще
        isActive() {
          return this.params.visible === true;
        }

        rootImageFolder() {
          if (String.any(this.params.rootImageFolder)) {
            return this.params.rootImageFolder;
          } else {
            return Sprite_UIElement.RootImageFolder;
          }
        }

        // * Сделать чёрно белым
        desaturate() {
          this.filters = [new PIXI.filters.ColorMatrixFilter()];
          this.filters[0].desaturate();
        }

        // * Общий метод (можно ли редактировать визуально)
        isCanBeEdited() {
          return false;
        }

        // * Общий метод (надо ли скрывать при игровом сообщнии)
        isHaveHideWithMessageFlag() {
          return false;
        }

        // * Общий метод (находится ли объект под мышкой)
        isUnderMouse() {
          var ref;
          return (ref = this.zeroChild()) != null ? ref.isUnderMouse() : void 0;
        }

        // * Параметры первого элемента (если он есть)
        realWidth() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realWidth();
            } else {
              return child.width;
            }
          }
          return 0;
        }

        realHeight() {
          var child;
          child = this.zeroChild();
          if (child != null) {
            if (child instanceof KDCore.UI.Sprite_UIElement) {
              return child.realHeight();
            } else {
              return child.height;
            }
          }
          return 0;
        }

        // * Первый "физический" элемент (спрайт)
        zeroChild() {
          return this.children[0];
        }

        // * Метод восстановления значения на стандартные настройки
        reset(property) {
          var e;
          try {
            switch (property) {
              case "position":
                this._resetPosition();
                break;
              default:
                this[property] = this.params[property];
            }
          } catch (error) {
            e = error;
            KDCore.warning(e);
          }
        }

      };

      // * Корневая директория для изображений
      Sprite_UIElement.RootImageFolder = "Alpha";

      return Sprite_UIElement;

    }).call(this);
    KDCore.UI.Sprite_UIElement = Sprite_UIElement;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIElement.prototype;
    _._init = function() {
      var e;
      this._prepare();
      try {
        return this._createContent();
      } catch (error) {
        e = error;
        KDCore.warning(e);
        // * Если при создании произошла ошибка, отключаем элемент
        return this.isActive = function() {
          return false;
        };
      }
    };
    
    // * Подготовка элемента (проверка параметров)
    _._prepare = function() {
      if (this.params == null) {
        this.params = this.defaultParams();
      }
      return this.visible = this.params.visible;
    };
    // * Наследники создают свои элементы в этом методе
    _._createContent = function() {}; // * EMPTY
    
    // * Сброс позиции
    _._resetPosition = function() {
      var e, x, y;
      if (this.params.position == null) {
        return;
      }
      try {
        ({x, y} = this.params.position);
        this.move(x, y);
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIButton;
    // * Кнопка на экране, можно нажимать
    Sprite_UIButton = class Sprite_UIButton extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "Button_Inventory",
          isHaveDisabled: true,
          rootImageFolder: null, //?optional
          click: "console.log('click')" // * число или код
        };
      }

      // * Кнопка не поддерживает перерисовку
      draw() {} // * EMPTY

      disable() {
        var ref;
        return (ref = this.button) != null ? ref.disable() : void 0;
      }

      enable() {
        var ref;
        return (ref = this.button) != null ? ref.enable() : void 0;
      }

      setState(isEnabled) {
        if (isEnabled) {
          return this.enable();
        } else {
          return this.disable();
        }
      }

      
        // * Просто вызов метода
      call() {
        var ref;
        return (ref = this.button) != null ? ref.click() : void 0;
      }

      // * Вызов метода с симуляцией нажатия
      click() {
        var ref, ref1;
        if ((ref = this.button) != null) {
          ref.click();
        }
        return (ref1 = this.button) != null ? ref1.simulateClick() : void 0;
      }

    };
    KDCore.UI.Sprite_UIButton = Sprite_UIButton;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIButton.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.image.isEmpty()) {
        KDCore.warning('You try create Button without image');
        return;
      }
      this.button = new KDCore.ButtonM(this.params.image, this.params.isHaveDisabled, this.rootImageFolder());
      this.add(this.button);
      return this._registerClickMethod();
    };
    _._registerClickMethod = function() {
      var commonEventId, e, method, ref, script;
      if (!String.any(this.params.click)) {
        return;
      }
      method = null;
      try {
        // * Если число, то значит общее событие
        if (isFinite(this.params.click)) {
          commonEventId = parseInt(this.params.click);
          if (commonEventId > 0) {
            method = function() {
              return $gameTemp.reserveCommonEvent(commonEventId);
            };
          }
        } else {
          // * Иначе скрипт
          script = this.params.click;
          method = function() {
            return eval(script);
          };
        }
        return this.button.addClickHandler(method);
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return (ref = this.button) != null ? ref.clearClickHandler() : void 0;
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Рисует лицо персонажа (из папки Faces)
    var Sprite_UIFace;
    Sprite_UIFace = class Sprite_UIFace extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          faceName: "Actor1",
          faceIndex: 0,
          mirror: false,
          size: 144
        };
      }

      draw() {
        return this.drawFace(...arguments);
      }

      drawFace(faceName, faceIndex) {
        return this._drawFaceWhenReady(faceName, faceIndex);
      }

    };
    KDCore.UI.Sprite_UIFace = Sprite_UIFace;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIFace.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._createFaceSprite();
    };
    _._createFaceSprite = function() {
      this._faceSpr = KDCore.Sprite.FromBitmap(this.params.size);
      if (this.params.mirror === true) {
        this._flipFaceSpr();
      }
      this.add(this._faceSpr);
      this._drawFaceWhenReady(this.params.faceName, this.params.faceIndex);
    };
    _._flipFaceSpr = function() {
      this._faceSpr.scale.x = -1;
      this._faceSpr.x = this.params.size;
    };
    _._drawFaceWhenReady = function(name, index = 0) {
      var ref;
      if ((ref = this._faceSpr) != null) {
        ref.clear();
      }
      if (!String.any(name)) {
        return;
      }
      if (index < 0) {
        return;
      }
      this._drawOnReady = {name, index};
      this._faceSourceBitmap = ImageManager.loadFace(name);
      this._faceSourceBitmap.addLoadListener(this._drawFace.bind(this));
      this._drawFace();
    };
    _._drawFace = function() {
      var fh, fw, size, sx, sy;
      if (this._faceSpr == null) {
        return;
      }
      this._faceSpr.clear();
      if (!String.any(this._drawOnReady.name)) {
        return;
      }
      if (KDCore.isMZ()) {
        fw = ImageManager.faceWidth;
        fh = ImageManager.faceHeight;
      } else {
        fw = Window_Base._faceWidth;
        fh = Window_Base._faceHeight;
      }
      size = this.params.size;
      sx = (this._drawOnReady.index % 4) * fw;
      sy = Math.floor(this._drawOnReady.index / 4) * fh;
      this._faceSpr.bitmap.blt(this._faceSourceBitmap, sx, sy, fw, fh, 0, 0, size, size);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //TODO: ROOT IMAGE FOLDER AS PARAMETER!!!
    var Sprite_UIGauge;
    Sprite_UIGauge = class Sprite_UIGauge extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          fill: "",
          foreground: "",
          mask: "",
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawGauge(...arguments);
      }

      drawGauge(percent = 1) {
        this._lastValue = percent;
        return this._drawGauge(percent);
      }

      isVertical() {
        return this.params.vertical === true;
      }

    };
    KDCore.UI.Sprite_UIGauge = Sprite_UIGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIGauge.prototype;
    //$[OVER]
    _._createContent = function() {
      // * Загружается главное изображение, затем уже все остальные, т.к. нужны размеры
      return this._loadFillImage();
    };
    _._loadFillImage = function() {
      // * Главное изображение, поэтому если не указано, то ничего
      if (this.params.fill.isEmpty()) {
        KDCore.warning('You try create Gauge without fill image');
        return;
      }
      KDCore.Utils.loadImageAsync(this.rootImageFolder(), this.params.fill).then(this._createParts.bind(this));
    };
    // * Получаем изображение заполнения и создаём части (т.к. есть размеры)
    _._createParts = function(fillBitmap) {
      this.fillBitmap = fillBitmap;
      this._createBackground();
      this._createFillLayer();
      this._loadForeground();
      this._loadMask();
      return this._onReady();
    };
    _._createBackground = function() {
      this.background = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      this.background.b().fillAll(this.params.backColor);
      this.background.opacity = this.params.backOpacity;
      return this.add(this.background);
    };
    _._createFillLayer = function() {
      this.fillLayer = KDCore.Sprite.FromBitmap(this.fillBitmap.width, this.fillBitmap.height);
      return this.add(this.fillLayer);
    };
    _._loadForeground = function() {
      var fore;
      if (String.isNullOrEmpty(this.params.foreground)) {
        return;
      }
      fore = KDCore.Sprite.FromImg(this.params.foreground, this.rootImageFolder());
      return this.add(fore);
    };
    _._loadMask = function() {
      var mask;
      if (String.isNullOrEmpty(this.params.mask)) {
        return;
      }
      mask = KDCore.Sprite.FromImg(this.params.mask, this.rootImageFolder());
      this.mask = mask;
      return this.add(mask);
    };
    // * Если что-то было до готовности, нарисовать
    _._onReady = function() {
      this.drawGauge(this._lastValue);
    };
    _._drawGauge = function(percent) {
      if (this.fillLayer == null) {
        return;
      }
      this.fillLayer.clear();
      if (this.isVertical()) {
        return this._drawVerGauge(percent);
      } else {
        return this._drawHorGauge(percent);
      }
    };
    _._drawHorGauge = function(percent) {
      var w;
      w = this.fillBitmap.width * percent;
      return this.fillLayer.b().blt(this.fillBitmap, 0, 0, w, this.fillLayer.height, 0, 0);
    };
    _._drawVerGauge = function(percent) {
      var h, hy;
      h = this.fillBitmap.height * percent;
      hy = this.fillBitmap.height - h;
      this.fillLayer.b().blt(this.fillBitmap, 0, 0, this.fillLayer.width, h, 0, hy);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIIcon;
    Sprite_UIIcon = class Sprite_UIIcon extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          index: 0,
          size: 32,
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawIcon(...arguments);
      }

      drawIcon(index = 0, noSmoth = false) {
        this._lastValue = index;
        return this._drawIcon(index, noSmoth);
      }

    };
    KDCore.UI.Sprite_UIIcon = Sprite_UIIcon;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIIcon.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createIcon();
      return this._drawIcon(this.params.index);
    };
    _._createIcon = function() {
      this._icon = KDCore.Sprite.FromBitmap(this.params.size, this.params.size);
      this.add(this._icon);
      return this._onReady();
    };
    _._onReady = function() {
      return this.drawIcon(this._lastValue);
    };
    _._drawIcon = function(index, noSmoth = false) {
      this._icon.clear();
      if (KDCore.SDK.isString(index)) {
        this._drawImageIcon(index, noSmoth);
      } else {
        if (index <= 0) {
          return;
        }
        this._icon.drawIcon(0, 0, index, this.params.size, noSmoth);
      }
    };
    _._drawImageIcon = function(imageName, noSmoth = false) {
      return KDCore.Utils.loadImageAsync(this.rootImageFolder(), imageName).then((bitmap) => {
        return this._icon.drawIcon(0, 0, bitmap, this.params.size, noSmoth);
      });
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIImage;
    Sprite_UIImage = class Sprite_UIImage extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          image: "",
          rootImageFolder: null //?optional
        };
      }

      draw() {
        return this.drawImage(...arguments);
      }

      drawImage(image) {
        return this._drawImage(image);
      }

    };
    KDCore.UI.Sprite_UIImage = Sprite_UIImage;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIImage.prototype;
    //$[OVER]
    _._createContent = function() {
      return this._drawImage(this.params.image);
    };
    _._drawImage = function(image) {
      this._clearImage();
      if (!String.isNullOrEmpty(image)) {
        this._image = KDCore.Sprite.FromImg(image, this.rootImageFolder());
        this.add(this._image);
      }
    };
    _._clearImage = function() {
      if (this._image == null) {
        return;
      }
      this._image.visible = false;
      this.removeChild(this._image);
      return this._image = null;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIRect;
    Sprite_UIRect = class Sprite_UIRect extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          fillColor: "#FFFFFF".toCss(),
          fillOpacity: 255,
          borderColor: "#000000".toCss(),
          borderThickness: 1,
          borderOpacity: 255
        };
      }

      draw() {
        return this.fill(...arguments);
      }

      fill(color, opacity = 255) {
        return this._fill(color, opacity);
      }

      drawBorder(color, thickness = 1, opacity = 255) {
        return this._drawBorder(color, thickness, opacity);
      }

    };
    KDCore.UI.Sprite_UIRect = Sprite_UIRect;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIRect.prototype;
    //$[OVER]
    _._createContent = function() {
      if (String.any(this.params.fillColor)) {
        this._createFill();
        this.fill(this.params.fillColor, this.params.fillOpacity);
      }
      if (String.any(this.params.borderColor) && this.params.borderThickness > 0) {
        this._createBorder();
        return this.drawBorder(this.params.borderColor, this.params.borderThickness, this.params.borderOpacity);
      }
    };
    _._createFill = function() {
      this._fillSpr = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._fillSpr);
    };
    _._createBorder = function() {
      this._borderSprite = KDCore.Sprite.FromBitmap(this.params.size.w, this.params.size.h);
      return this.addChild(this._borderSprite);
    };
    _._fill = function(color, opacity) {
      if (this._fillSpr == null) {
        return;
      }
      this._fillSpr.fillAll(color);
      this._fillSpr.opacity = opacity;
    };
    _._drawBorder = function(color, thickness, opacity) {
      var b;
      if (this._borderSprite == null) {
        return;
      }
      this._borderSprite.clear();
      b = this._borderSprite.b();
      // * Top line
      b.fillRect(0, 0, b.width, thickness, color);
      // * Bottom line
      b.fillRect(0, b.height - thickness, b.width, thickness, color);
      // * Left line
      b.fillRect(0, 0, thickness, b.height, color);
      // * Right line
      b.fillRect(b.width - thickness, 0, thickness, b.height, color);
      return this._borderSprite.opacity = opacity;
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 17.11.22
    var Sprite_UIText;
    Sprite_UIText = class Sprite_UIText extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 60,
            h: 20
          },
          alignment: "center",
          font: {
            face: null,
            size: 18,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          outline: {
            color: null,
            width: 2
          },
          textColor: "#FFFFFF".toCss(),
          // ? can be Null or not exists
          shadow: {
            color: "#000",
            opacity: 200,
            margins: {
              x: 1,
              y: 1
            }
          }
        };
      }

      //?DYNAMIC
      // * Сперва рисуем по готовности, а как загрузился спрайт, меняем
      drawText(text) {
        return this._drawTextWhenReady(text);
      }

      // * Сборка текста с учётом формата
      // * Заменить вхождения %1, %2 на значения параметров
      drawTextWithFormat(/*format string, arguments parameters... */) {
        var text;
        text = this._convertFormatedString(...arguments);
        this.drawText(text);
      }

      // * Пишет текст с определённым цветом (один раз)
      drawTextColor(text, colorCss) {
        if (this._textSpr == null) {
          return;
        }
        this._textSpr.b().textColor = colorCss;
        this.drawText(text);
        this._textSpr.b().textColor = this.params.textColor;
      }

    };
    KDCore.UI.Sprite_UIText = Sprite_UIText;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIText.prototype;
    //$[OVER]
    _._createContent = function() {
      if (this.params.shadow != null) {
        this._createShadow();
      }
      return this._createTextSprite();
    };
    _._createTextSprite = function() {
      this._textSpr = KDCore.Sprite.FromParams(this.params);
      this._textSpr.onReady(this._onReady.bind(this));
      return this.add(this._textSpr);
    };
    // * Выполнить по готовности
    _._onReady = function() {
      // * Переключить метод, так как уже готов
      this.drawText = this._drawText;
      // * Написать то что нужно было до готовности (если есть)
      if (this._drawOnReady == null) {
        return;
      }
      this.drawText(this._drawOnReady);
      this._drawOnReady = null;
    };
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.clear();
      if (text != null) {
        this._textSpr.drawTextFull(text);
      }
      if (this._shadowSpr != null) {
        this._shadowSpr.clear();
        if (text != null) {
          this._shadowSpr.drawTextFull(text);
        }
      }
    };
    // * Написать текст когда будет готов
    _._drawTextWhenReady = function(text) {
      this._drawOnReady = text;
      return this._drawText(text);
    };
    
    // * Заменить вхождения %1, %2 на значения параметров
    _._convertFormatedString = function(/*text, args...*/) {
      var e, i, j, ref, text;
      try {
        text = arguments[0];
        for (i = j = 1, ref = arguments.length; (1 <= ref ? j < ref : j > ref); i = 1 <= ref ? ++j : --j) {
          try {
            if (arguments[i] == null) {
              continue;
            }
            text = text.replace("%" + i, arguments[i]);
          } catch (error) {
            e = error;
            KDCore.warning(e);
            text = "[wrong format text input]";
          }
        }
        return text;
      } catch (error) {
        e = error;
        KDCore.warning(e);
        return "[wrong format text input]";
      }
    };
    _._createShadow = function() {
      this._shadowSpr = KDCore.Sprite.FromParams(this.params);
      this._shadowSpr.bitmap.textColor = this.params.shadow.color;
      this._shadowSpr.opacity = this.params.shadow.opacity;
      this._shadowSpr.x += this.params.shadow.margins.x;
      this._shadowSpr.y += this.params.shadow.margins.y;
      return this.add(this._shadowSpr);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    //rev 30.12.21
    var Sprite_UITextExt;
    Sprite_UITextExt = class Sprite_UITextExt extends KDCore.UI.Sprite_UIText {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 200,
            h: 60
          },
          font: {
            face: null,
            size: 14,
            italic: false
          },
          margins: {
            x: 0,
            y: 0
          },
          // * новые параметры (KDCore 2.7)
          //?null могут быть
          singleLine: false,
          forceCentered: false
        };
      }

      //$[OVER]
      // * Данный метод не поддерживается, так как тут основа не Sprite, а Window
      drawTextColor() {
        return this.drawText(...arguments);
      }

    };
    KDCore.UI.Sprite_UITextExt = Sprite_UITextExt;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextExt.prototype;
    //$[OVER]
    _._createTextSprite = function() {
      var rect;
      rect = new Rectangle(0, 0, this.params.size.w, this.params.size.h);
      this._textSpr = new KDCore.Window_ExtTextLineBase(rect, this.params.font);
      this._textSpr.x = this.params.margins.x || 0;
      this._textSpr.y = this.params.margins.y || 0;
      this.add(this._textSpr);
      // * На следующий кадр, чтобы не было потери текста (опасно)
      //setTimeout (=> @_onReady() ), 10
      this._onReady(); // * Сразу
    };
    
    //$[OVER]
    _._drawText = function(text) {
      if (this._textSpr == null) {
        return;
      }
      this._textSpr.contents.clear();
      if (this.params.forceCentered === true) {
        this._textSpr.drawTextExInCenter(text, 0, 0, this._textSpr.width, this._textSpr.height);
      } else {
        if (this.params.singleLine === true) {
          this._textSpr.drawTextEx(text, 0, 0, this._textSpr.width);
        } else {
          // * По умолчанию
          this._textSpr.drawTextExWithWordWrap(text, 0, 0, this._textSpr.width);
        }
      }
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UITextWithBack;
    Sprite_UITextWithBack = class Sprite_UITextWithBack extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          text: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            alignment: "center",
            font: {
              face: null,
              size: 18,
              italic: false
            },
            margins: {
              x: 0,
              y: 0
            },
            outline: {
              color: null,
              width: 2
            },
            textColor: "#000000".toCss()
          },
          rect: {
            visible: true,
            size: {
              w: 60,
              h: 20
            },
            fillColor: "#FFFFFF".toCss(),
            fillOpacity: 255,
            borderColor: "#000000".toCss(),
            borderThickness: 1,
            borderOpacity: 255
          },
          textMargins: {
            x: 0,
            y: 0
          }
        };
      }

      draw() {
        return this.drawText(...arguments);
      }

      // * Aргументы смотри в Sprite_UIText
      drawText() {
        return this.text.draw(...arguments);
      }

      drawTextColor() {
        return this.text.drawTextColor(...arguments);
      }

      // * Аргументы смотри в Sprite_UIRect
      fill() {
        return this.rect.fill(...arguments);
      }

      drawBorder() {
        return this.rect.drawBorder(...arguments);
      }

      //$[OVER]
      isUnderMouse() {
        return this.rect.isUnderMouse();
      }

    };
    KDCore.UI.Sprite_UITextWithBack = Sprite_UITextWithBack;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITextWithBack.prototype;
    //$[OVER]
    _._createContent = function() {
      this._createRect();
      return this._createText();
    };
    _._createRect = function() {
      this.rect = new KDCore.UI.Sprite_UIRect(this.params.rect);
      return this.addChild(this.rect);
    };
    _._createText = function() {
      var x, y;
      this.text = new KDCore.UI.Sprite_UIText(this.params.text);
      ({x, y} = this.params.textMargins);
      this.text.move(x, y);
      return this.addChild(this.text);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {
    var Sprite_UIColorGauge;
    Sprite_UIColorGauge = class Sprite_UIColorGauge extends KDCore.UI.Sprite_UIGauge {
      constructor() {
        super(...arguments);
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          size: {
            w: 100,
            h: 40
          },
          fill: "#FFFFFF", // * В отличии от Gauge, тут цвет, а не картинка
          foreground: "", // картинка
          mask: "", // картинка
          backColor: "#000000".toCss(),
          backOpacity: 255,
          vertical: false,
          rootImageFolder: null //?optional
        };
      }

    };
    KDCore.UI.Sprite_UIColorGauge = Sprite_UIColorGauge;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UIColorGauge.prototype;
    //$[OVER]
    // * Заместо изображения используем простой Bitmap с заливкой цвета
    _._loadFillImage = function() {
      var fillBitmap;
      fillBitmap = new Bitmap(this.params.size.w, this.params.size.h);
      fillBitmap.fillAll(this.params.fill);
      this._createParts(fillBitmap);
    };
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  (function() {    // * Данный UI Элемент является только контейнером
    // * Он ничего не рисует, нужно добавлять в него
    // * контент методом addContent

    //rev 17.11.22
    var Sprite_UITooltip;
    Sprite_UITooltip = class Sprite_UITooltip extends KDCore.UI.Sprite_UIElement {
      constructor() {
        super(...arguments);
        this.opacity = 0;
      }

      isTooltipActive() {
        return (this._opThread != null) || (this._opChanger != null) || this.opacity > 0;
      }

      activateTooltip(x, y, parent) {
        if (this.isTooltipActive()) {
          return;
        }
        this.deactivateTooltip();
        this.move(x, y);
        this._opThread = new KDCore.TimedUpdate(this.params.delay, this.showTooltip.bind(this));
        if (!this.params.isGlobal && (parent != null)) {
          parent.addChild(this);
        } else {
          // * Always on Top on Scene  (if Global)
          SceneManager._scene.addChild(this);
        }
      }

      deactivateTooltip() {
        this._opThread = null;
        this._opChanger = null;
        return this.opacity = 0;
      }

      showTooltip() {
        this._opThread = null;
        this.appear(this.params.opacityChangeStep);
        if (this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      update() {
        var ref;
        super.update();
        if ((ref = this._opThread) != null) {
          ref.update();
        }
        if (this.isTooltipActive() && this.params.cursorRelative === true) {
          return this.toCursor();
        }
      }

      // * Стандартный набор настроек
      defaultParams() {
        return {
          visible: true,
          delay: 30,
          opacityChangeStep: 35,
          margins: {
            x: 8,
            y: 8
          },
          isGlobal: true,
          cursorRelative: true
        };
      }

      toCursor() {
        var x, y;
        ({x, y} = this.params.margins);
        return this.move(TouchInput.x + x, TouchInput.y + y);
      }

      // * Основной метод, нужно добавить контент
      addContent(content) {
        return this.add(content);
      }

    };
    KDCore.UI.Sprite_UITooltip = Sprite_UITooltip;
  })();
  return (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = KDCore.UI.Sprite_UITooltip.prototype;
  })();
});

// ■ END PRIVATE.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__processEscapeCharacter, _;
  //@[DEFINES]
  _ = Window_Base.prototype;
  //@[ALIAS]
  ALIAS__processEscapeCharacter = _.processEscapeCharacter;
  _.processEscapeCharacter = function(code, textState) {
    switch (code) {
      case 'CHEX':
        this.pProcessColorChangeHex(this.pObtainEscapeParamHexColor(textState));
        break;
      case 'ISZ':
        this.pProcessDrawIconSized(this.pObtainEscapeParamIconArr(textState), textState);
        break;
      case 'PSZ':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, false);
        break;
      case 'PSB':
        this.pProcessDrawPictureSized(this.pObtainEscapeParamImgArr(textState), textState, true);
        break;
      default:
        ALIAS__processEscapeCharacter.call(this, code, textState);
    }
  };
  //?NEW
  _.pObtainEscapeParamHexColor = function(textState) {
    var arr, regExp, textPart;
    regExp = /^\[(#?([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      return arr[1];
    } else {
      return "";
    }
  };
  //?NEW
  _.pObtainEscapeParamIconArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          return parseInt(i.trim());
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pObtainEscapeParamImgArr = function(textState) {
    var arr, params, regExp, textPart;
    regExp = /^\[(\w+,\s*\d+,\s*\d+,\s*-?\d+,\s*-?\d+)\]/;
    textPart = textState.text.slice(textState.index);
    arr = regExp.exec(textPart);
    if (arr != null) {
      textState.index += arr[0].length;
      if (arr[1] != null) {
        params = arr[1].split(",").map(function(i) {
          if (isFinite(i)) {
            return parseInt(i.trim());
          } else {
            return i;
          }
        });
        return params;
      }
    }
    return [];
  };
  //?NEW
  _.pProcessColorChangeHex = function(colorHex) {
    var e;
    try {
      this.changeTextColor(colorHex);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.resetTextColor();
    }
  };
  //?NEW
  //?params: [INDEX, SIZE, DX, DY]
  _.pProcessDrawIconSized = function(params, textState) {
    var dx, dy, e, iconIndex, size, staticMargin, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      size = params[1];
      if (params[1] == null) {
        if (KDCore.isMZ()) {
          size = ImageManager.iconWidth;
        } else {
          size = Window_Base._iconWidth;
        }
      }
      if (params[2] == null) {
        params[2] = 0;
      }
      if (params[3] == null) {
        params[3] = 0;
      }
      iconIndex = params[0];
      dx = params[2];
      dy = params[3];
      staticMargin = 2;
      x = textState.x + staticMargin + dx;
      y = textState.y + staticMargin + dy;
      if (KDCore.isMZ()) {
        if (textState.drawing === true) {
          // * Только в режиме рисования
          this.contents.drawIcon(x, y, iconIndex, size);
        }
      } else {
        this.contents.drawIcon(x, y, iconIndex, size);
      }
      textState.x += size + (staticMargin * 2) + dx;
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  //?NEW
  //?params: [NAME, W, H, DX, DY]
  _.pProcessDrawPictureSized = function(params, textState, isUnderText = false) {
    var drawBitmap, drawProcess, e, height, name, source, width, x, y;
    try {
      if (params == null) {
        return;
      }
      if (params.isEmpty()) {
        return;
      }
      name = params[0];
      if (!String.any(name)) {
        return;
      }
      width = params[1];
      height = params[2];
      if (params[3] == null) {
        params[3] = 0;
      }
      if (params[4] == null) {
        params[4] = 0;
      }
      x = textState.x + 2 + params[3];
      y = textState.y + 2 + params[4];
      drawBitmap = this.contents;
      source = this.pGetSourceImageForDrawPictureSized(name);
      if ((KDCore.isMZ() && textState.drawing === true) || KDCore.isMV()) {
        drawProcess = function() {
          var e;
          try {
            if (drawBitmap == null) {
              return;
            }
            return drawBitmap.drawOnMe(source, x, y, width, height);
          } catch (error) {
            e = error;
            return KDCore.warning(e);
          }
        };
        source.addLoadListener(drawProcess);
      }
      if (isUnderText !== true) {
        // * Вариант, что текст не будет "перескакивать" за ширину картинки а пойдёт поверх (т.е. фоновая картинка)
        // * Если картине не preload, то может "вылезти" на текст потом, так как рисоваться будет позже
        textState.x += width + 4 + params[3];
      }
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  // * Данный метод вынесен отдельно, чтобы можно было переопределять папки
  return _.pGetSourceImageForDrawPictureSized = function(name) {
    return ImageManager.loadPicture(name);
  };
});


// Generated by CoffeeScript 2.6.1



// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var FloatingWindow;
  
    // * Общий класс для всех окон на карте
  /*parameters
      {
          draggable: true,
          closeButton: true,
          moveToCenter: true,
          alwaysOnTop: true,
          header: true
      }
  */
  FloatingWindow = class FloatingWindow extends KDCore.Sprite {
    constructor(mainParent, windowW, windowH, parameters) {
      super();
      this.mainParent = mainParent;
      this.windowW = windowW;
      this.windowH = windowH;
      this.parameters = parameters;
      this._init();
      return;
    }

    static StaticSettings() {
      return {
        draggable: false,
        closeButton: false,
        moveToCenter: false,
        alwaysOnTop: false,
        header: false
      };
    }

    // * Статическое окно с дочерним
    static StaticWindow(parent, sub) {
      var p, w;
      p = KDCore.FloatingWindow.StaticSettings();
      w = new KDCore.FloatingWindow(parent, sub.width, sub.height, p);
      w.setSubWindow(sub);
      w.open();
      return w;
    }

    isActive() {
      return this.visible === true;
    }

    isReady() {
      return this._isReady === true;
    }

    isMouseIn() {
      return this.inPosition(TouchInput);
    }

    isOpen() {
      return this.isActive();
    }

    // * Дочернее окно (если есть)
    sub() {
      return this._subw;
    }

    setOnReadyHandler(_readyHandler) {
      this._readyHandler = _readyHandler;
      if ((this._readyHandler != null) && this._isReady === true) {
        return this._readyHandler();
      }
    }

    isDraggable() {
      return this._isDraggable === true && (this._headerSpr != null) && this._headerSpr.visible === true && this.isOpen();
    }

    setCloseHandler(_closeHandler) {
      this._closeHandler = _closeHandler;
    }

    callCloseHandler() {
      if (this._closeHandler != null) {
        return this._closeHandler();
      }
    }

    setDraggingHandler(_dragHandler) {
      this._dragHandler = _dragHandler;
    }

    setDragEndHandler(_dragEndHandler) {
      this._dragEndHandler = _dragEndHandler;
    }

    hideHeader() {} //TODO:

    hideCloseButton() {} //TODO:

    
      // * Сдвиг заголовка по X, чтобы рамку не задевал
    headerMarginX() {
      return 2;
    }

    // * Сдвиг заголовка по Y, чтобы рамку не задевал
    headerMarginY() {
      return 0;
    }

    // * Стандартная позиция кнопки "закрыть"
    closeButtonPosition() {
      return {
        x: this.width - 24,
        y: 4
      };
    }

    open() {
      if (this.isOpen()) {
        return;
      }
      this._open();
      this._afterOpen();
    }

    close() {
      if (!this.isOpen()) {
        return;
      }
      this._close();
      this._afterClose();
    }

    rootImageFolder() {
      return "Alpha/Windows";
    }

    update() {
      super.update();
      this._updateMouseCheckThread();
      this._updateDragging();
    }

    // * Добавить спрайт на специальный слой контента
    addContent(sprite) {
      return this._contentLayer.addChild(sprite);
    }

    // * Добавить дочернее окно
    setSubWindow(w) {
      this._subw = w;
      this.addContent(w);
    }

    destroy() {
      this._close();
      return Sprite.prototype.destroy.call(this);
    }

  };
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ PRIVATE.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    //@[DEFINES]
    _ = FloatingWindow.prototype;
    _._init = function() {
      var ref;
      // * Окно всегда закрыто
      this.visible = false;
      // * Контент прогрузился?
      this._isReady = false;
      this._applyParameters();
      if (this._isAlwaysOnTop === false) {
        // * Если не всегда поверх окон, то добавляем сразу к родителю (один раз)
        if ((ref = this.mainParent) != null) {
          ref.addChild(this);
        }
      }
      this._initFloatingSystem();
      this._createLayers();
      this._loadWindowFrame();
    };
    // * Тут ничего не создавать, не двигать, так как
    // * конент создаётся Async, см. метод _createCustomElements
    _._applyParameters = function() {
      var p;
      this._applyDefaults();
      if (this.parameters == null) {
        return;
      }
      p = this.parameters;
      if (p.draggable != null) {
        this._isDraggable = p.draggable;
      }
      if (p.moveToCenter != null) {
        this._isMoveToCenter = p.moveToCenter;
      }
      if (p.header != null) {
        this._isHeaderVisible = p.header;
      }
      if (p.closeButton != null) {
        this._isHaveCloseButton = p.closeButton;
      }
      if (p.alwaysOnTop != null) {
        this._isAlwaysOnTop = p.alwaysOnTop;
      }
    };
    _._applyDefaults = function() {
      // * Окно можно перетаскивать мышкой (по умолчанию - да)
      this._isDraggable = true;
      this._isMoveToCenter = true;
      this._isHeaderVisible = true;
      this._isHaveCloseButton = true;
      this._isAlwaysOnTop = true;
    };
    _._initFloatingSystem = function() {
      if ($gameTemp._floatingWindows == null) {
        // * Создаём массив окон, он нужен для правильного
        // закрытия окон (по очереди) и перемещения drag and drop
        // с учётом верхнего окна
        $gameTemp._floatingWindows = [];
      }
      // * Вспомогательная переменная, чтобы не вызывать методы каждый кадр
      this._mouseIn = false;
      // * Тоже вспомогательная переменная
      this._dragging = false;
    };
    _._moveToStartPosition = function() {
      if (this._isMoveToCenter === true) {
        return this.moveToCenter(Graphics.width / 2, Graphics.height / 2);
      }
    };
    _._closeButtonClick = function() {
      // * При исчезании, кнопка не успевает себя "удалить"
      $gameTemp.kdButtonUnderMouse = null;
      this.callCloseHandler();
      return this.close();
    };
    (function() {      // * DRAGGING
      // -----------------------------------------------------------------------
      _._updateDragging = function() {
        if (!this.isDraggable()) {
          return;
        }
        // * Если мы уже двигаем окно, но мышка вышла за границы, то можно дальше двигать
        // * Только если мышка не в окне и не двигали ранее, то не проверяем
        if (this._mouseIn === false && this._dragging === false) {
          return;
        }
        // * Если существует объект который сейчас dragging
        if ($gameTemp.pkdDraggableInstance != null) {
          // * Если этот объект не этот объект, то выходим из метода
          if ($gameTemp.pkdDraggableInstance !== this) {
            return;
          }
        }
        if (TouchInput.isLongPressed()) {
          if (this._dragging === false) {
            this._onDragStart();
          } else {
            this._onDragging();
          }
        } else {
          this._stopDragging();
        }
      };
      _._onDragStart = function() {
        // * Проверка, в области Header или нет
        if (!this._isMouseInHeader()) {
          return;
        }
        // * Разница в координатах курсора и объекта, чтобы убрать эффект "прыжка"
        this.opacity = 200;
        this._deltaXY = this.getDeltaXY();
        this._dragging = true;
        // * Устанавливаем глобальную ссылку на объект перемещения
        $gameTemp.pkdDraggableInstance = this;
      };
      _.getDeltaXY = function() {
        var p;
        p = new KDCore.Point(this.x, this.y);
        return p.delta(TouchInput);
      };
      _._onDragging = function() {
        // * Защита от перетаскивания за края экрана
        if (!this._isNewMousePositionOnScreen()) {
          return;
        }
        this.move(TouchInput.x - this._deltaXY.x, TouchInput.y - this._deltaXY.y);
        if (this._dragHandler != null) {
          return this._dragHandler();
        }
      };
      _._stopDragging = function() {
        if (this._dragging === true) {
          this._dragging = false;
          this.opacity = 255;
          this._clearDraggableGlocalInstance();
          if (this._dragEndHandler != null) {
            this._dragEndHandler();
          }
        }
      };
      // * Освобождаем глобальную ссылку
      _._clearDraggableGlocalInstance = function() {
        if ($gameTemp.pkdDraggableInstance === this) {
          return $gameTemp.pkdDraggableInstance = null;
        }
      };
      _._isMouseInHeader = function() {
        if (this._headerSpr == null) {
          return false;
        }
        return this._headerSpr.isContainsPoint(TouchInput);
      };
      _._isNewMousePositionOnScreen = function() {
        return KDCore.Utils.isPointInScreen(TouchInput, 10);
      };
    })();
    (function() {      // -----------------------------------------------------------------------

      // * CREATE ELEMENTS
      // -----------------------------------------------------------------------
      
      // * Слои нужны, так как изображения загружаються асинхронно
      _._createLayers = function() {
        this._mainLayer = new Sprite();
        this._contentLayer = new Sprite();
        this._headerLayer = new Sprite();
        this._closeButtonLayer = new Sprite();
        this.addChild(this._mainLayer);
        this.addChild(this._contentLayer);
        this.addChild(this._headerLayer);
        this.addChild(this._closeButtonLayer);
      };
      _._loadWindowFrame = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "windowFrame").then(this._createWindow.bind(this));
      };
      _._createWindow = function(frameImage) {
        this.bitmap = new Bitmap(this.windowW, this.windowH);
        this.wFrame = new KDCore.Sprite_TilingFrame(this.windowW, this.windowH, frameImage);
        this._mainLayer.addChild(this.wFrame);
        this._createParts();
      };
      _._createParts = function() {
        this._loadHeader();
        if (this._isHaveCloseButton === true) {
          this._createCloseButton();
        }
        this._moveToStartPosition();
        this._createCustomElements();
        // * Окно готово
        this._isReady = true;
        if (this._readyHandler != null) {
          this._readyHandler();
        }
      };
      _._loadHeader = function() {
        return KDCore.Utils.loadImageAsync(this.rootImageFolder(), "headerLine").then(this._createHeader.bind(this));
      };
      _._createHeader = function(headerLineImage) {
        var w;
        w = this.windowW - (this.headerMarginX() * 2);
        this._headerSpr = new KDCore.Sprite_TilingLine(w, headerLineImage.height, headerLineImage);
        this._headerSpr.x = this.headerMarginX();
        this._headerSpr.y = this.headerMarginY();
        this._headerLayer.addChild(this._headerSpr);
        if (this._isHeaderVisible === true) {
          // * Сдвигаем контент, чтобы было начало под заголовком
          this._contentLayer.y += headerLineImage.height + this.headerMarginY();
        } else {
          this._headerSpr.visible = false;
        }
      };
      _._createCloseButton = function() {
        this._closeButton = new KDCore.ButtonM("windowCloseButton", false, this.rootImageFolder());
        this._closeButtonLayer.addChild(this._closeButton);
        this._closeButton.move(this.closeButtonPosition());
        this._closeButton.addClickHandler(this._closeButtonClick.bind(this));
      };
      //%[FOR CHILDRENS]
      // * Наследники создают свои элементы в этом методе
      // * Есть специальный метод addContent()
      _._createCustomElements = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * MOUSE
      // -----------------------------------------------------------------------
      
      // * Определение если мышка в области окна
      //TODO: Есть проблема при открытии окна сразу под курсором
      _._registerMouseInOut = function() {
        if (!this.isOpen()) {
          return;
        }
        if (this.isMouseIn()) {
          if (this._mouseIn === false) {
            this._mouseIn = true;
            this._onMouseIn();
          }
        } else {
          if (this._mouseIn === true) {
            this._mouseIn = false;
            this._onMouseOut();
          }
        }
      };
      // * Используется похожая система что и в KDCore.ButtonM
      _._onMouseIn = function() {
        return $gameTemp.floatingWindowUnderMouse = this;
      };
      _._onMouseOut = function() {
        if ($gameTemp.floatingWindowUnderMouse === this) {
          return $gameTemp.floatingWindowUnderMouse = null;
        }
      };
      // * Будем проверять мышка ли в окне только при открытом окне
      _._createMouseCheckThread = function() {
        this._mouseCheckThread = new KDCore.TimedUpdate(1, this._registerMouseInOut.bind(this));
        this._updateMouseCheckThread = () => {
          return this._mouseCheckThread.update();
        };
        return this._mouseCheckThread.call();
      };
      // * Когда окно закрывается, никаких проверок, обнуляем метод
      _._destroyMouseCheckThread = function() {
        this._mouseCheckThread = null;
        return this._updateMouseCheckThread = function() {};
      };
      //?DYNAMIC
      _._updateMouseCheckThread = function() {}; // * EMPTY
    })();
    (function() {      // -----------------------------------------------------------------------

      // * OPEN OR CLOSE
      // -----------------------------------------------------------------------
      _._open = function() {
        var ref, ref1;
        this.visible = true;
        if ((ref = $gameTemp._floatingWindows) != null) {
          ref.push(this);
        }
        if (this._isAlwaysOnTop === true) {
          // * Окно, которое открывается, всегда снова выше остальных (опция)
          if ((ref1 = this.mainParent) != null) {
            ref1.addChild(this);
          }
        }
        return this._createMouseCheckThread();
      };
      _._afterOpen = function() {}; // * EMPTY
      _._close = function() {
        this.visible = false;
        if (this._isAlwaysOnTop === true) {
          this.removeFromParent();
        }
        this._clearDraggableGlocalInstance();
        $gameTemp._floatingWindows.delete(this);
        this._onMouseOut();
        return this._destroyMouseCheckThread();
      };
      _._afterClose = function() {}; // * EMPTY
    })();
  })();
  (function() {    // ■ END PRIVATE.coffee
    //---------------------------------------------------------------------------

    // * Если окно под курсором, нельзя нажимать на карте для движения игрока
    // -----------------------------------------------------------------------
    (function() {      //╒═════════════════════════════════════════════════════════════════════════╛
      // ■ Scene_Map.coffee
      //╒═════════════════════════════════════════════════════════════════════════╛
      //---------------------------------------------------------------------------
      var ALIAS__isAnyButtonPressed, ALIAS__processMapTouch, _;
      
      //@[DEFINES]
      _ = Scene_Map.prototype;
      if (KDCore.isMZ()) {
        //@[ALIAS]
        ALIAS__isAnyButtonPressed = _.isAnyButtonPressed;
        _.isAnyButtonPressed = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return true;
          } else {
            return ALIAS__isAnyButtonPressed.call(this);
          }
        };
      } else {
        //@[ALIAS]
        ALIAS__processMapTouch = _.processMapTouch;
        _.processMapTouch = function() {
          if ($gameTemp.floatingWindowUnderMouse != null) {
            return;
          }
          return ALIAS__processMapTouch.call(this);
        };
      }
    })();
  })();
  //@[EXTEND]
  // ■ END Scene_Map.coffee
  //---------------------------------------------------------------------------
  return KDCore.FloatingWindow = FloatingWindow;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var HUI;
  // * Html UI Manager
  // * Набор инструментов для работы с HTML элементами интерфейса
  HUI = function() {};
  (function() {
    var _;
    //@[DEFINES]
    _ = HUI;
    _.init = function() {
      // * Данный набор инструментов могут использовать многие плагины, поэтому проверка
      if (this.isInited()) {
        return;
      }
      this._createMainParentInHtml();
      this._extendGraphicsClass();
      this.refresh();
    };
    // * Был ли создан (инициализирован) основной элемент
    _.isInited = function() {
      return this.parent() != null;
    };
    // * Основной элемент родитель для всех элементов UI
    _.parent = function() {
      return this._parent;
    };
    _.refresh = function() {
      if (!this.isInited()) {
        return;
      }
      Graphics._centerElement(this._parent);
      this._parent.style.zIndex = 2;
      this._parent.style.width = Graphics._canvas.style.width;
      this._parent.style.height = Graphics._canvas.style.height;
    };
    _.addCSS = function(name, folder = "css") {
      var head;
      if (!this.isInited()) {
        this.init();
      }
      head = document.getElementsByTagName("head")[0];
      if (head != null) {
        head.insertAdjacentHTML("beforeend", "<link rel=\"stylesheet\" href=\"$0/$1.css\" />".replace("$0", folder).replace("$1", name));
      }
    };
    _.addElement = function(id, html, classes = null) {
      var cls, element, i, len;
      if (!this.isInited()) {
        this.init();
      }
      element = document.createElement("div");
      element.id = id;
      element.innerHTML = html;
      if (classes != null) {
        for (i = 0, len = classes.length; i < len; i++) {
          cls = classes[i];
          element.classList.add(cls);
        }
      }
      this._parent.appendChild(element);
      return element;
    };
    // * Может быть NULL
    _.getElement = function(id) {
      return document.getElementById(id);
    };
    _.removeElement = function(element) {
      if (element == null) {
        return;
      }
      if (KDCore.SDK.isString(element)) {
        this.removeElementById(element);
      } else {
        this.removeElementById(element.id);
      }
    };
    _.removeElementById = function(elementId) {
      var element;
      if (!this.isInited()) {
        return;
      }
      element = this.getElement(elementId);
      if (element != null) {
        this._parent.removeChild(element);
      }
    };
    // * PRIVATE ------------------------------------------------------------------
    _._createMainParentInHtml = function() {
      this._parent = document.createElement("div");
      this._parent.id = "KDCoreMain";
      document.body.appendChild(this._parent);
    };
    _._extendGraphicsClass = function() {
      var ALIAS___updateCanvas;
      //@[ALIAS]
      ALIAS___updateCanvas = Graphics._updateCanvas;
      Graphics._updateCanvas = function() {
        ALIAS___updateCanvas.call(this);
        return KDCore.HUI.refresh();
      };
    };
  })();
  //@[EXTEND]
  return KDCore.HUI = HUI;
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___onMouseUp, ALIAS___onRightButtonDown, ALIAS__clear, ALIAS__update, _;
  // * Right mouse pressed
  // * Определение когда правая (вторая) кнопка мыши зажата и удерживается

  //@[DEFINES]
  _ = TouchInput;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    this._kdMousePressed2 = false;
    this._kdPressedTime2 = 0;
  };
  //@[ALIAS]
  ALIAS___onRightButtonDown = _._onRightButtonDown;
  _._onRightButtonDown = function(event) {
    var check;
    ALIAS___onRightButtonDown.call(this, event);
    // * Это значит что ALIAS метод прошёл (верные X и Y в Canvas)
    if (KDCore.isMZ()) {
      check = this._newState.cancelled === true;
    } else {
      check = this._events.cancelled === true;
    }
    if (check === true) {
      this._kdMousePressed2 = true;
      this._kdPressedTime2 = 0;
    }
  };
  //@[ALIAS]
  ALIAS___onMouseUp = _._onMouseUp;
  _._onMouseUp = function(event) {
    ALIAS___onMouseUp.call(this, event);
    if (event.button === 2) {
      this._kdMousePressed2 = false;
    }
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this.kdIsPressed2()) {
      return this._kdPressedTime2++;
    }
  };
  //?[NEW]
  return _.kdIsPressed2 = function() {
    return this._kdMousePressed2 === true;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  // * Методы из RPG Maker MZ которых нет в RPG Maker MV
  if (KDCore.isMZ()) {
    return;
  }
  (function() {    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Scene_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Scene_Base.prototype;
    _.calcWindowHeight = function(numLines, selectable) {
      if (selectable === true) {
        return Window_Selectable.prototype.fittingHeight(numLines);
      } else {
        return Window_Base.prototype.fittingHeight(numLines);
      }
    };
  })();
  (function() {    // ■ END Scene_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Selectable.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Window_Selectable.prototype;
    _.itemLineRect = function(index) {
      return this.itemRect(index);
    };
  })();
  (function() {    // ■ END Window_Selectable.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Window_Base.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var ALIAS__initialize, ALIAS__processEscapeCharacter, _;
    //@[DEFINES]
    _ = Window_Base.prototype;
    // * Чтоб можно было Rectangle принимать в конструктор
    //@[ALIAS]
    ALIAS__initialize = _.initialize;
    _.initialize = function(x, y, w, h) {
      if (x instanceof PIXI.Rectangle || x instanceof Rectangle) {
        return ALIAS__initialize.call(this, x.x, x.y, x.width, x.height);
      } else {
        return ALIAS__initialize.call(this, ...arguments);
      }
    };
    
    // * В MZ используется FS для изменения размера шрифта в тексте
    //@[ALIAS]
    ALIAS__processEscapeCharacter = _.processEscapeCharacter;
    _.processEscapeCharacter = function(code, textState) {
      if (code === "FS") {
        this.contents.fontSize = this.obtainEscapeParam(textState);
      } else {
        ALIAS__processEscapeCharacter.call(this, code, textState);
      }
    };
  })();
  (function() {    // ■ END Window_Base.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Spriteset_Map.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Spriteset_Map.prototype;
    _.findTargetSprite = function(target) {
      return this._characterSprites.find(function(sprite) {
        return sprite.checkCharacter(target);
      });
    };
  })();
  return (function() {    // ■ END Spriteset_Map.coffee
    //---------------------------------------------------------------------------

    //╒═════════════════════════════════════════════════════════════════════════╛
    // ■ Sprite_Character.coffee
    //╒═════════════════════════════════════════════════════════════════════════╛
    //---------------------------------------------------------------------------
    var _;
    
    //@[DEFINES]
    _ = Sprite_Character.prototype;
    _.checkCharacter = function(character) {
      return this._character === character;
    };
  })();
});

// ■ END Sprite_Character.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_SM_processMapTouch, alias_TIOMM;
  //?SMouse better alternative
  if (KDCore.isMZ()) {
    return;
  }
  // * Для ButtonM
  //@[ALIAS]
  alias_SM_processMapTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() {
    if ($gameTemp.kdButtonUnderMouse != null) {
      if ($gameTemp.kdButtonUnderMouse.parent == null) {
        return $gameTemp.kdButtonUnderMouse = null;
      } else {

      }
    } else {
      return alias_SM_processMapTouch.call(this);
    }
  };
  //@[ALIAS]
  alias_TIOMM = TouchInput._onMouseMove;
  TouchInput._onMouseMove = function(event) {
    var x, y;
    alias_TIOMM.call(this, event);
    x = Graphics.pageToCanvasX(event.pageX);
    y = Graphics.pageToCanvasY(event.pageY);
    if (Graphics.isInsideCanvas(x, y)) {
      return this._onHover(x, y);
    }
  };
  
  //?NEW, from MZ
  return TouchInput._onHover = function(_x, _y) {
    this._x = _x;
    this._y = _y;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS__clear, ALIAS__update, _;
  if (KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Input;
  //@[ALIAS]
  ALIAS__clear = _.clear;
  _.clear = function() {
    ALIAS__clear.call(this);
    return this._virtualButton = null;
  };
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this);
    if (this._virtualButton == null) {
      return;
    }
    this._latestButton = this._virtualButton;
    this._pressedTime = 0;
    return this._virtualButton = null;
  };
  return _.virtualClick = function(buttonName) {
    return this._virtualButton = buttonName;
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var ALIAS___startLoading, _;
  // * В версии RPG Maker MZ 1.5.0 появился баг что картинки не успевают прогрузится
  // * Данный фикс, возвращает старое поведение
  if (!KDCore.isMZ()) {
    return;
  }
  //@[DEFINES]
  _ = Bitmap.prototype;
  //@[ALIAS]
  ALIAS___startLoading = _._startLoading;
  return _._startLoading = function() {
    if (Utils.hasEncryptedImages()) {
      ALIAS___startLoading.call(this, ...arguments);
    } else {
      // * Это из RPG Maker MZ до версии 1.5
      this._image = new Image();
      this._image.onload = this._onLoad.bind(this);
      this._image.onerror = this._onError.bind(this);
      this._destroyCanvas();
      this._loadingState = "loading";
      this._image.src = this._url;
    }
  };
});


// Generated by CoffeeScript 2.6.1
KDCore.registerLibraryToLoad(function() {
  var alias_WBDTEX_KDCore29122021;
  // * <center>, для RPG Maker MZ и если нету Visu Message Core
  if (KDCore.isMZ()) {
    alias_WBDTEX_KDCore29122021 = Window_Base.prototype.drawTextEx;
    Window_Base.prototype.drawTextEx = function(text, x, y, width) {
      var e, newText;
      try {
        if (Imported.VisuMZ_1_MessageCore !== true) { // * В Visu уже есть <center>
          if (String.any(text) && text.contains("<center>")) {
            if (text[0] === "<" && text[1] === "c") { // * Должен быть в начале строки
              newText = text.replace("<center>", "");
              return this.drawTextExInCenter(newText, x, y, width);
            }
          }
        }
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
      return alias_WBDTEX_KDCore29122021.call(this, ...arguments);
    };
  }
  //?NEW
  Window_Base.prototype.drawTextExInCenter = function(text, x, y, width, height) {
    var e, newX, newY, textSize;
    try {
      if (KDCore.isMV()) { // * В MV нет поддержки данного метода
        this.drawTextEx(...arguments);
        return;
      }
      textSize = this.textSizeEx(text);
      newX = x + width / 2 - textSize.width / 2;
      if ((height != null) && height > 0) {
        newY = y + height / 2 - textSize.height / 2;
      } else {
        newY = y;
      }
      return this.drawTextEx(text, newX, newY, width);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      return this.drawTextEx(text, x, y, width);
    }
  };
  //?NEW
  Window_Base.prototype.drawTextExWithWordWrap = function(text, x, y, width, maxLines) {
    var maxWidth, wrappedText;
    this.drawTextEx("", 0, 0, 100);
    maxWidth = this.contentsWidth();
    wrappedText = Window_Message.prototype.pWordWrap.call(this, text, width || maxWidth, maxLines);
    return this.drawTextEx(wrappedText, x, y, width);
  };
  //?NEW
  return Window_Message.prototype.pWordWrap = function(text, maxWidth, maxLines) {
    var i, j, k, l, line, lines, newLines, ref, ref1, result, spaceLeft, spaceWidth, wordWidth, wordWidthWithSpace, words;
    lines = text.split('\n');
    maxWidth = maxWidth;
    spaceWidth = this.contents.measureTextWidth(' ');
    result = '';
    newLines = 1;
    for (i = k = 0, ref = lines.length; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      spaceLeft = maxWidth;
      line = lines[i];
      words = line.split(' ');
      for (j = l = 0, ref1 = words.length; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        wordWidth = this.contents.measureTextWidth(words[j].replaceAll(/\\C\[\d+\]/g, ""));
        wordWidthWithSpace = wordWidth + spaceWidth;
        if (j === 0 || wordWidthWithSpace > spaceLeft) {
          if (j > 0) {
            if (maxLines === newLines) {
              return result;
            }
            result += '\n';
            newLines++;
          }
          result += words[j];
          spaceLeft = maxWidth - wordWidth;
          if (j === 0 && line.match(/\\n\w*\s*<\s*\\n\[\w*\s*\]\s*>*/gi)) {
            spaceLeft += 200;
          }
        } else {
          spaceLeft -= wordWidthWithSpace;
          result += ' ' + words[j];
        }
      }
      if (i < lines.length - 1) {
        result += '\n';
      }
    }
    return result;
  };
});


// Generated by CoffeeScript 2.6.1
// * Последний файл (после всех классов)
// * Загружает библиотеки
var i, len, lib, ref, text;

if (KDCore._requireLoadLibrary === true) {
  ref = KDCore[KDCore._loader];
  for (i = 0, len = ref.length; i < len; i++) {
    lib = ref[i];
    lib();
  }
  KDCore[KDCore._loader] = [];
  text = "%c  KDCore is loaded " + KDCore.Version;
  console.log(text, 'background: #222; color: #82b2ff');
}

// ==========================================================================
// ==========================================================================

//   END OF PLUGINS CORE LIBRARY
//   (Next code is this plugin code)

// ==========================================================================
// ==========================================================================

//Plugin KDCore builded by PKD PluginBuilder 2.2 - 08.12.2022

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ API: Phone
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = window.PKD_PhoneMenu;
  _.Show = function() {
    if ($gameSystem._pkdPhoneDisabled === true) {
      return;
    }
    return SceneManager.push(PKD_ScenePhone);
  };
  _.Hide = function() {
    var e;
    try {
      if (PKD_PhoneMenu.Utils.isPhoneScene()) {
        return SceneManager._scene.popScene();
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Disable = function() {
    $gameSystem._pkdPhoneDisabled = true;
    PKD_PhoneMenu.Hide();
  };
  _.Enable = function() {
    return $gameSystem._pkdPhoneDisabled = null;
  };
  _.AddMessage = function(avatar, name, evId) {
    var e;
    try {
      $gameSystem.pkdAddNewPhoneMessage(avatar, name, evId);
      if (KDCore.Utils.isSceneMap()) {
        SceneManager._scene.pkdRefreshPhoneIcon();
      }
      return PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.IsHaveNewMessages = function() {
    var e;
    try {
      return $gameSystem.pkdIsHaveAnyUnreadMessage();
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return false;
  };
  _.AddApp = function(name) {
    var apps, e;
    try {
      apps = $gameSystem.pkdGetPhone().apps;
      if (apps.contains(name)) {
        return;
      }
      apps.push(name);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.RemoveApp = function(name) {
    var e;
    try {
      $gameSystem.pkdGetPhone().apps.delete(name);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  };
  _.ChangePhone = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().image = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.ChangeWallpaper = function(imageName) {
    var e;
    try {
      if (!String.any(imageName)) {
        return;
      }
      return $gameSystem.pkdGetPhone().wallpaper = imageName;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?Inner
  _.StartApp = function(id) {
    var e;
    try {
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        console.warn("Phone Apps can be started only inside Phone Scene!");
      } else {
        return SceneManager._scene.setPhoneAppContext(id);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //?Inner
  _.ExecuteSingleCmdInMessage = function(commandList) {
    var e;
    try {
      if (commandList == null) {
        return;
      }
      if (!PKD_PhoneMenu.Utils.isPhoneScene()) {
        return;
      }
      return SceneManager._scene._startInnerCe(commandList);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

(function() {  // ■ END Phone
  //---------------------------------------------------------------------------

  //╒═════════════════════════════════════════════════════════════════════════╛
  // ■ API: Phone Map
  //╒═════════════════════════════════════════════════════════════════════════╛
  //---------------------------------------------------------------------------
  var _;
  // * Скрипты для иконки телефона на сцене карты
  window.PKD_PhoneMenu.Map = {};
  window.PhoneIcon = window.PKD_PhoneMenu.Map;
  //@[DEFINES]
  _ = window.PKD_PhoneMenu.Map;
  _.Show = function() {
    var e;
    try {
      if (PKD_PhoneMenu.PP.getPhoneSettings().isShowMapIcon !== true) {
        return;
      }
      if ($gameSystem._pkdPhoneIconDisabled === true) {
        return;
      }
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return SceneManager._scene.pkdShowPhoneIcon();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Hide = function() {
    var e;
    try {
      if (!KDCore.Utils.isSceneMap()) {
        return;
      }
      return SceneManager._scene.pkdHidePhoneIcon();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.Disable = function() {
    $gameSystem._pkdPhoneIconDisabled = true;
    PKD_PhoneMenu.Map.Hide();
  };
  _.Enable = function() {
    return $gameSystem._pkdPhoneIconDisabled = null;
  };
})();

// ■ END API: Phone Map
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_PhoneMenu.PP;
  
  // * paramName, defaultValue
  _.getLoaderParam = function() {
    var e;
    try {
      if (this._loader == null) {
        PKD_PhoneMenu.LoadPluginSettings();
      }
      return this._loader.getParam(...arguments);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
    return null;
  };
  _.getPhoneSettings = function() {
    return this.getLoaderParam("phoneSettings", {
      openPhoneKey: "p",
      screenSize: {
        w: 278,
        h: 434
      },
      screenOffset: {
        x: 16,
        y: 86
      },
      phonePosition: {
        x: "Graphics.width / 2 - 155",
        y: "20"
      },
      appsGrid: {
        x: 3,
        y: 4
      },
      isAnimate: true,
      animationSpeed: 24,
      appBackgroundColor: "#FFF",
      image: "PhoneFace",
      wallpaper: "Wallpaper1",
      isShowMapIcon: true,
      mapIconPosition: {
        x: 4,
        y: 120
      }
    });
  };
  _.getPhoneAppNameTextSettings = function() {
    return $ppJson_AppNameTestSettings;
  };
  _.getPhoneDefaultApps = function() {
    return this.getLoaderParam("phoneDefaultAppsList", "messagesApp, saveApp, loadApp, settingsApp");
  };
  _.getPhoneApps = function() {
    return this.getLoaderParam("phoneApps", [
      {
        id: "messagesApp",
        name: "Messages",
        icon: "AppIcon_Messages",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "Phone.StartApp('messagesApp')",
        isOuterStart: false,
        alertSwitchId: 1
      },
      {
        id: "saveApp",
        name: "Save",
        icon: "AppIcon_SaveGame",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "SceneManager.push(Scene_Save)",
        isOuterStart: false,
        alertSwitchId: 2
      },
      {
        id: "loadApp",
        name: "Load",
        icon: "AppIcon_LoadGame",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "SceneManager.push(Scene_Load)",
        isOuterStart: false,
        alertSwitchId: 0
      },
      {
        id: "settingsApp",
        name: "Settings",
        icon: "AppIcon_Settings",
        visibleSwitchId: 0,
        enabledSwitchId: 0,
        commonEventId: "SceneManager.push(Scene_Options)",
        isOuterStart: false,
        alertSwitchId: 0
      }
    ]);
  };
})();


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppContext;

PKD_SpritePhoneAppContext = class PKD_SpritePhoneAppContext extends KDCore.Sprite {
  constructor() {
    super();
    this._appData = this._loadAppData();
    this._scaleFactor = 0.3;
    this._isReady = false;
    this._create();
    this._createContent();
    this._animateAppear();
  }

  _loadAppData() {
    return {
      name: "App"
    };
  }

  backHandler(phone) {
    return phone != null ? phone.closeAppContext() : void 0;
  }

  update() {
    super.update();
    if (this._changer != null) {
      this._updateAnimation();
    }
    if (this._isReady === true) {
      return this._updateInteractions();
    }
  }

  _updateAnimation() {
    this._changer.update();
    return this._contextBack.scale.set(this._scaleFactor);
  }

  _updateInteractions() {}

  //TODO:
  getTopHeaderText() {
    return this._appData.name;
  }

  screenSize() {
    var screenSize;
    ({screenSize} = PKD_PhoneMenu.PP.getPhoneSettings());
    return screenSize;
  }

  _create() {
    var appBackgroundColor, screenSize;
    ({screenSize, appBackgroundColor} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._contextBack = new KDCore.Sprite(this._defaultAppBackgroundBitmap());
    this._contextBack.opacity = 0;
    this._contextBack.anchor.set(0.5);
    this._contextBack.scale.set(0.3);
    this._contextBack.x = screenSize.w / 2;
    this._contextBack.y = screenSize.h / 2;
    return this.addChild(this._contextBack);
  }

  _defaultAppBackgroundBitmap() {
    var appBackgroundColor, b, h, screenSize, w;
    ({screenSize, appBackgroundColor} = PKD_PhoneMenu.PP.getPhoneSettings());
    ({w, h} = screenSize);
    b = new Bitmap(w, h);
    b.fillAll(appBackgroundColor);
    return b;
  }

  _animateAppear() {
    this._contextBack.appear(45);
    this._changer = new KDCore.Changer(this);
    this._changer.change('_scaleFactor').from(0.3).to(1.0).step(0.15).done(() => {
      return this.onAnimatinDone();
    });
    this._changer.start();
  }

  onAnimatinDone() {
    this._isReady = true;
    this._changer = null;
    this._contextBack.scale.set(1.0);
    return setTimeout((() => {
      var e;
      try {
        return this.showContent();
      } catch (error) {
        e = error;
        return KDCore.warning(e);
      }
    }), 100);
  }

  _createContent() {} // * FOR CHILDRENS

  showContent() {} // * FOR CHILDRENS

};


function _0x3364(_0x45519b, _0x2838d8) {
    var _0xd2bdee = _0xd2bd();
    return _0x3364 = function (_0x3364bd, _0x3be965) {
        _0x3364bd = _0x3364bd - 0x95;
        var _0x35cdf3 = _0xd2bdee[_0x3364bd];
        return _0x35cdf3;
    }, _0x3364(_0x45519b, _0x2838d8);
}
function _0xd2bd() {
    var _0x1a3127 = [
        '\x69\x73\x50\x68\x6f\x6e\x65\x53\x63\x65\x6e\x65',
        '\x67\x65\x74\x50\x68\x6f\x6e\x65\x41\x70\x70\x73',
        '\x52\x48\x42\x47\x46',
        '\x73\x65\x74\x56\x61\x6c\x75\x65',
        '\x31\x34\x33\x39\x33\x34\x39\x30\x4b\x47\x79\x61\x73\x43',
        '\x74\x72\x69\x6d',
        '\x61\x6c\x65\x72\x74\x53\x77\x69\x74\x63\x68\x49\x64',
        '\x6b\x77\x5a\x6c\x57',
        '\x70\x6b\x6b\x53\x73',
        '\x36\x45\x61\x4a\x53\x4d\x46',
        '\x68\x57\x52\x45\x53',
        '\x47\x65\x74\x41\x70\x70\x44\x61\x74\x61',
        '\x78\x48\x65\x7a\x48',
        '\x73\x70\x6c\x69\x74',
        '\x75\x6f\x50\x68\x49',
        '\x33\x39\x30\x39\x30\x35\x36\x73\x77\x4c\x50\x71\x70',
        '\x67\x65\x74\x42\x79\x49\x64',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73',
        '\x64\x72\x61\x77\x54\x6f\x70\x54\x65\x78\x74',
        '\x31\x38\x59\x57\x64\x4c\x58\x51',
        '\x76\x61\x6c\x75\x65',
        '\x72\x65\x66\x72\x65\x73\x68\x4d\x65\x73\x73\x61\x67\x65\x73\x41\x70\x70\x41\x6c\x65\x72\x74',
        '\x55\x74\x69\x6c\x73',
        '\x34\x37\x34\x77\x79\x77\x4a\x6d\x56',
        '\x6d\x61\x6b\x65\x4e\x65\x77\x50\x68\x6f\x6e\x65',
        '\x46\x53\x66\x4b\x41',
        '\x4f\x50\x44\x4c\x69',
        '\x73\x63\x72\x65\x65\x6e\x53\x69\x7a\x65',
        '\x43\x74\x75\x41\x61',
        '\x5f\x73\x63\x65\x6e\x65',
        '\x31\x36\x35\x37\x30\x59\x4a\x68\x50\x6b\x6c',
        '\x49\x73\x48\x61\x76\x65\x4e\x65\x77\x4d\x65\x73\x73\x61\x67\x65\x73',
        '\x66\x4f\x4b\x64\x43',
        '\x52\x47\x65\x44\x56',
        '\x31\x39\x31\x38\x31\x38\x4c\x52\x59\x4f\x4a\x6d',
        '\x53\x65\x74\x50\x68\x6f\x6e\x65\x54\x6f\x70\x54\x65\x78\x74',
        '\x31\x31\x30\x6a\x78\x70\x4c\x4f\x58',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x75\x6d\x61\x71\x77',
        '\x56\x4f\x6c\x72\x79',
        '\x77\x70\x45\x75\x79',
        '\x31\x32\x31\x38\x37\x39\x34\x78\x42\x69\x7a\x54\x79',
        '\x34\x36\x31\x36\x37\x39\x36\x5a\x75\x71\x70\x4c\x62',
        '\x67\x65\x74\x53\x79\x73\x74\x65\x6d\x41\x70\x70\x43\x6f\x6e\x74\x65\x78\x74',
        '\x49\x58\x72\x4b\x71',
        '\x67\x65\x74\x50\x68\x6f\x6e\x65\x44\x65\x66\x61\x75\x6c\x74\x41\x70\x70\x73',
        '\x36\x35\x32\x4c\x71\x78\x67\x4b\x46',
        '\x6d\x61\x70',
        '\x31\x32\x33\x32\x32\x38\x76\x6a\x56\x6c\x62\x6d',
        '\x50\x58\x70\x79\x62',
        '\x6d\x65\x73\x73\x61\x67\x65\x73\x41\x70\x70',
        '\x67\x65\x74\x50\x68\x6f\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73',
        '\x69\x73\x53\x63\x65\x6e\x65\x43\x68\x61\x6e\x67\x69\x6e\x67'
    ];
    _0xd2bd = function () {
        return _0x1a3127;
    };
    return _0xd2bd();
}
(function (_0x3efd39, _0x541545) {
    var _0x4ad54c = _0x3364, _0x32cd0f = _0x3efd39();
    while (!![]) {
        try {
            var _0x1dc21d = parseInt(_0x4ad54c(0xa2)) / 0x1 + parseInt(_0x4ad54c(0x9b)) / 0x2 * (parseInt(_0x4ad54c(0xb7)) / 0x3) + -parseInt(_0x4ad54c(0xa7)) / 0x4 * (parseInt(_0x4ad54c(0x97)) / 0x5) + -parseInt(_0x4ad54c(0xc5)) / 0x6 * (parseInt(_0x4ad54c(0xa9)) / 0x7) + -parseInt(_0x4ad54c(0xbd)) / 0x8 * (parseInt(_0x4ad54c(0xc1)) / 0x9) + -parseInt(_0x4ad54c(0xb2)) / 0xa + parseInt(_0x4ad54c(0x9d)) / 0xb * (parseInt(_0x4ad54c(0xa3)) / 0xc);
            if (_0x1dc21d === _0x541545)
                break;
            else
                _0x32cd0f['push'](_0x32cd0f['shift']());
        } catch (_0x290441) {
            _0x32cd0f['push'](_0x32cd0f['shift']());
        }
    }
}(_0xd2bd, 0xde45f), (function () {
    var _0x306f65 = _0x3364, _0x305301;
    _0x305301 = PKD_PhoneMenu[_0x306f65(0xc4)], _0x305301[_0x306f65(0xc6)] = function () {
        var _0x22eece = _0x306f65;
        if (_0x22eece(0xc7) === _0x22eece(0xba))
            return [_0x22eece(0xab)][_0x22eece(0xbf)](_0x404300);
        else {
            var _0x2f9897, _0x3c8cf7, _0x3b82f7, _0x32e310;
            ({
                image: _0x3b82f7,
                wallpaper: _0x32e310
            } = PKD_PhoneMenu['\x50\x50']['\x67\x65\x74\x50\x68\x6f\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73']());
            try {
                _0x2f9897 = PKD_PhoneMenu['\x50\x50'][_0x22eece(0xa6)]()[_0x22eece(0xbb)]('\x2c')[_0x22eece(0xa8)](function (_0x44e8c2) {
                    var _0x477e48 = _0x22eece;
                    if (_0x477e48(0xbc) !== '\x75\x6f\x50\x68\x49') {
                        var _0xd3e35d;
                        try {
                            if (!_0x4051f5[_0x477e48(0xc4)]['\x69\x73\x50\x68\x6f\x6e\x65\x53\x63\x65\x6e\x65']())
                                return;
                            return _0x3dd8fd[_0x477e48(0x96)][_0x477e48(0xc0)](_0x5423b9);
                        } catch (_0x533d78) {
                            return _0xd3e35d = _0x533d78, _0x4d4dbd[_0x477e48(0x9e)](_0xd3e35d);
                        }
                    } else
                        return _0x44e8c2['\x74\x72\x69\x6d']();
                });
            } catch (_0x2bfd97) {
                _0x3c8cf7 = _0x2bfd97, _0x2f9897 = [], KDCore[_0x22eece(0x9e)](_0x3c8cf7);
            }
            return {
                '\x69\x73\x45\x6e\x61\x62\x6c\x65\x64': !![],
                '\x69\x6d\x61\x67\x65': _0x3b82f7,
                '\x77\x61\x6c\x6c\x70\x61\x70\x65\x72': _0x32e310,
                '\x61\x70\x70\x73': _0x2f9897
            };
        }
    }, _0x305301[_0x306f65(0xc3)] = function () {
        var _0x555991 = _0x306f65;
        if (_0x555991(0xa5) !== _0x555991(0xc8)) {
            var _0x48057c, _0x527236;
            try {
                _0x48057c = PKD_PhoneMenu['\x50\x50'][_0x555991(0xaf)]()[_0x555991(0xbe)](_0x555991(0xab));
                if (_0x48057c != null && _0x48057c[_0x555991(0xb4)] > 0x0)
                    return $gameSwitches[_0x555991(0xb1)](_0x48057c[_0x555991(0xb4)], PKD_PhoneMenu[_0x555991(0x98)]());
            } catch (_0x642863) {
                return _0x555991(0xaa) === _0x555991(0xaa) ? (_0x527236 = _0x642863, KDCore[_0x555991(0x9e)](_0x527236)) : _0xfa82ff['\x74\x72\x69\x6d']();
            }
        } else {
            if (!_0x18050a[_0x555991(0xc4)][_0x555991(0xae)]())
                return;
            return _0x46d660['\x5f\x73\x63\x65\x6e\x65'][_0x555991(0xc0)](_0x4840ac);
        }
    }, _0x305301[_0x306f65(0xae)] = function () {
        var _0x2a67f5 = _0x306f65;
        if (_0x2a67f5(0xa0) !== _0x2a67f5(0x99))
            return !SceneManager['\x69\x73\x53\x63\x65\x6e\x65\x43\x68\x61\x6e\x67\x69\x6e\x67']() && SceneManager[_0x2a67f5(0x96)] instanceof PKD_ScenePhone;
        else
            _0x9dd1a2 = _0xbcc4e1, _0x2d3cd6 = [], _0x3a3ad3[_0x2a67f5(0x9e)](_0x4763c6);
    }, _0x305301[_0x306f65(0xc9)] = function () {
        var _0x437eb7 = _0x306f65;
        if (_0x437eb7(0xb6) === _0x437eb7(0xb6))
            return PKD_PhoneMenu['\x50\x50'][_0x437eb7(0xac)]()[_0x437eb7(0xc9)];
        else {
            var _0x3b70f2, _0x1bd906;
            try {
                _0x3b70f2 = _0xc607ca['\x50\x50'][_0x437eb7(0xaf)]()['\x67\x65\x74\x42\x79\x49\x64'](_0x437eb7(0xab));
                if (_0x3b70f2 != null && _0x3b70f2['\x61\x6c\x65\x72\x74\x53\x77\x69\x74\x63\x68\x49\x64'] > 0x0)
                    return _0x21edc5[_0x437eb7(0xb1)](_0x3b70f2['\x61\x6c\x65\x72\x74\x53\x77\x69\x74\x63\x68\x49\x64'], _0x4bf719['\x49\x73\x48\x61\x76\x65\x4e\x65\x77\x4d\x65\x73\x73\x61\x67\x65\x73']());
            } catch (_0x22a0d7) {
                return _0x1bd906 = _0x22a0d7, _0x3fc98e['\x77\x61\x72\x6e\x69\x6e\x67'](_0x1bd906);
            }
        }
    }, _0x305301['\x69\x73\x53\x77\x69\x74\x63\x68\x49\x73\x54\x52\x55\x45'] = function (_0x3be9a9) {
        var _0x2b1c76 = _0x306f65, _0xb90cc7;
        if (_0x3be9a9 == null) {
            if ('\x6b\x77\x5a\x6c\x57' === _0x2b1c76(0xb5))
                return !![];
            else {
                _0x1d5316 = _0x395328['\x50\x50'][_0x2b1c76(0xaf)]()[_0x2b1c76(0xbe)](_0x2b1c76(0xab));
                if (_0x5becec != null && _0x3e985b['\x61\x6c\x65\x72\x74\x53\x77\x69\x74\x63\x68\x49\x64'] > 0x0)
                    return _0x446425[_0x2b1c76(0xb1)](_0x423d31[_0x2b1c76(0xb4)], _0x74583c['\x49\x73\x48\x61\x76\x65\x4e\x65\x77\x4d\x65\x73\x73\x61\x67\x65\x73']());
            }
        }
        if (_0x3be9a9 <= 0x0)
            return !![];
        try {
            return $gameSwitches[_0x2b1c76(0xc2)](_0x3be9a9) === !![];
        } catch (_0x46421e) {
            if ('\x52\x48\x42\x47\x46' !== _0x2b1c76(0xb0))
                return _0x347675['\x50\x50'][_0x2b1c76(0xaf)]()[_0x2b1c76(0xbe)](_0x4d01e2);
            else
                _0xb90cc7 = _0x46421e, KDCore[_0x2b1c76(0x9e)](_0xb90cc7);
        }
        return ![];
    }, _0x305301['\x69\x73\x53\x79\x73\x74\x65\x6d\x41\x70\x70'] = function (_0x370d14) {
        var _0x4f2ee2 = _0x306f65;
        return _0x4f2ee2(0x95) !== _0x4f2ee2(0x9f) ? [_0x4f2ee2(0xab)][_0x4f2ee2(0xbf)](_0x370d14) : !_0x342dd1[_0x4f2ee2(0xad)]() && _0x2aa684[_0x4f2ee2(0x96)] instanceof _0x1d1cc3;
    }, _0x305301[_0x306f65(0xa4)] = function (_0x2f2715) {
        var _0x460c2d = _0x306f65;
        switch (_0x2f2715) {
        case _0x460c2d(0xab):
            return new PKD_SpritePhoneAppMessagesContext();
        default:
            return new PKD_SpritePhoneAppContext();
        }
    }, _0x305301[_0x306f65(0xb9)] = function (_0x37e8a0) {
        var _0x17bc02 = _0x306f65;
        return '\x4e\x6e\x41\x6e\x78' === '\x66\x51\x4c\x47\x56' ? _0x59bd96['\x50\x50']['\x67\x65\x74\x50\x68\x6f\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73']()[_0x17bc02(0xc9)] : PKD_PhoneMenu['\x50\x50'][_0x17bc02(0xaf)]()['\x67\x65\x74\x42\x79\x49\x64'](_0x37e8a0);
    }, _0x305301[_0x306f65(0x9c)] = function (_0x7b36d2) {
        var _0x90b307 = _0x306f65;
        if ('\x63\x71\x51\x78\x49' === _0x90b307(0xb8))
            return _0x2fe999 = _0x15da2a, _0x4cf0a9[_0x90b307(0x9e)](_0x18b37b);
        else {
            var _0x1f2ef9;
            try {
                if (_0x90b307(0x9a) === '\x52\x47\x65\x44\x56') {
                    if (!PKD_PhoneMenu[_0x90b307(0xc4)][_0x90b307(0xae)]()) {
                        if (_0x90b307(0xa1) !== _0x90b307(0xa1)) {
                            var _0x32129d, _0x333afc, _0x34f87d, _0x2b4cfd;
                            ({
                                image: _0x34f87d,
                                wallpaper: _0x2b4cfd
                            } = _0xb7c779['\x50\x50']['\x67\x65\x74\x50\x68\x6f\x6e\x65\x53\x65\x74\x74\x69\x6e\x67\x73']());
                            try {
                                _0x32129d = _0x2093ed['\x50\x50']['\x67\x65\x74\x50\x68\x6f\x6e\x65\x44\x65\x66\x61\x75\x6c\x74\x41\x70\x70\x73']()[_0x90b307(0xbb)]('\x2c')[_0x90b307(0xa8)](function (_0x1413e5) {
                                    var _0x2f369d = _0x90b307;
                                    return _0x1413e5[_0x2f369d(0xb3)]();
                                });
                            } catch (_0xda7046) {
                                _0x333afc = _0xda7046, _0x32129d = [], _0x5ebbbe['\x77\x61\x72\x6e\x69\x6e\x67'](_0x333afc);
                            }
                            return {
                                '\x69\x73\x45\x6e\x61\x62\x6c\x65\x64': !![],
                                '\x69\x6d\x61\x67\x65': _0x34f87d,
                                '\x77\x61\x6c\x6c\x70\x61\x70\x65\x72': _0x2b4cfd,
                                '\x61\x70\x70\x73': _0x32129d
                            };
                        } else
                            return;
                    }
                    return SceneManager[_0x90b307(0x96)][_0x90b307(0xc0)](_0x7b36d2);
                } else
                    _0x11c990 = _0x3f3d84['\x50\x50'][_0x90b307(0xa6)]()['\x73\x70\x6c\x69\x74']('\x2c')[_0x90b307(0xa8)](function (_0x5d6954) {
                        var _0x195d4b = _0x90b307;
                        return _0x5d6954[_0x195d4b(0xb3)]();
                    });
            } catch (_0x4ea2e9) {
                return _0x1f2ef9 = _0x4ea2e9, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x1f2ef9);
            }
        }
    };
}()));

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ DataManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = DataManager;
  DataManager._databaseFiles.push({
    name: "$ppJson_AppNameTestSettings",
    src: "PKD_PhoneMenu/PhoneAppNameTextSettings.json"
  });
})();

// ■ END DataManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__update, _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  //@[ALIAS]
  ALIAS__update = _.update;
  _.update = function() {
    ALIAS__update.call(this, ...arguments);
    if (this.pIsCanOpenPhoneNow()) {
      PKD_PhoneMenu.Show();
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Game_Player.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Game_Player.prototype;
  _.pIsCanOpenPhoneNow = function() {
    if ($gameMap.isEventRunning() || $gameMessage.isBusy()) {
      return false;
    }
    if (Input.isTriggered(PKD_PhoneMenu.PP.getPhoneSettings().openPhoneKey)) {
      return true;
    }
  };
})();

// ■ END Game_Player.coffee
//---------------------------------------------------------------------------


function _0x7956(_0xca451d, _0x1f4a4d) {
    var _0x1e3958 = _0x1e39();
    return _0x7956 = function (_0x795676, _0x50cf24) {
        _0x795676 = _0x795676 - 0x1c6;
        var _0x1fb927 = _0x1e3958[_0x795676];
        return _0x1fb927;
    }, _0x7956(_0xca451d, _0x1f4a4d);
}
function _0x1e39() {
    var _0x56f7ff = [
        '\x34\x39\x30\x38\x30\x4f\x4b\x42\x46\x71\x6c',
        '\x69\x46\x74\x4f\x43',
        '\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4f\x6c\x64\x4d\x65\x73\x73\x61\x67\x65\x73',
        '\x70\x6b\x64\x47\x65\x74\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x69\x73\x74\x6f\x72\x79',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x69\x6d\x61\x67\x65',
        '\x6e\x61\x6d\x65',
        '\x6d\x61\x6b\x65\x4e\x65\x77\x50\x68\x6f\x6e\x65',
        '\x70\x6b\x64\x49\x73\x4e\x65\x77\x4d\x65\x73\x73\x61\x67\x65\x46\x72\x6f\x6d',
        '\x48\x46\x4f\x42\x59',
        '\x77\x65\x57\x55\x7a',
        '\x55\x74\x69\x6c\x73',
        '\x67\x65\x74\x42\x79\x46\x69\x65\x6c\x64',
        '\x70\x75\x73\x68',
        '\x70\x6b\x64\x50\x72\x65\x70\x61\x72\x65\x50\x68\x6f\x6e\x65\x49\x6d\x61\x67\x65\x73',
        '\x65\x76\x49\x64',
        '\x70\x6b\x64\x47\x65\x74\x50\x68\x6f\x6e\x65',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x58\x63\x4f\x68\x67',
        '\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65\x73',
        '\x62\x49\x6f\x52\x7a',
        '\x70\x6b\x64\x49\x73\x48\x61\x76\x65\x41\x6e\x79\x55\x6e\x72\x65\x61\x64\x4d\x65\x73\x73\x61\x67\x65',
        '\x77\x61\x6c\x6c\x70\x61\x70\x65\x72',
        '\x38\x34\x30\x31\x37\x32\x6f\x6f\x55\x66\x45\x73',
        '\x70\x6b\x64\x47\x65\x74\x4f\x6c\x64\x4d\x65\x73\x73\x61\x67\x65\x73\x4c\x69\x73\x74',
        '\x37\x38\x54\x79\x46\x56\x7a\x48',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x50\x68\x6f\x6e\x65',
        '\x62\x58\x47\x67\x53',
        '\x35\x33\x32\x38\x4c\x67\x54\x53\x6a\x65',
        '\x70\x6b\x64\x47\x65\x74\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65\x73\x4c\x69\x73\x74',
        '\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65',
        '\x31\x33\x35\x31\x31\x35\x33\x6f\x6f\x55\x4e\x65\x77',
        '\x35\x32\x39\x38\x30\x32\x38\x30\x6a\x52\x4f\x41\x71\x59',
        '\x6c\x61\x73\x74',
        '\x31\x30\x36\x36\x32\x31\x37\x34\x4b\x65\x53\x48\x68\x49',
        '\x7a\x6d\x77\x57\x62',
        '\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x69\x73\x74\x6f\x72\x79',
        '\x35\x30\x53\x51\x6a\x41\x49\x55',
        '\x31\x33\x38\x30\x34\x67\x75\x63\x6f\x58\x6f',
        '\x37\x31\x37\x36\x39\x36\x72\x64\x44\x50\x68\x78',
        '\x63\x6f\x6e\x74\x61\x69\x6e\x73'
    ];
    _0x1e39 = function () {
        return _0x56f7ff;
    };
    return _0x1e39();
}
(function (_0x2362a4, _0x23590f) {
    var _0x3c0567 = _0x7956, _0x5af8cb = _0x2362a4();
    while (!![]) {
        try {
            var _0x34951e = -parseInt(_0x3c0567(0x1df)) / 0x1 + parseInt(_0x3c0567(0x1d9)) / 0x2 * (parseInt(_0x3c0567(0x1e9)) / 0x3) + -parseInt(_0x3c0567(0x1d7)) / 0x4 + -parseInt(_0x3c0567(0x1e5)) / 0x5 * (parseInt(_0x3c0567(0x1e7)) / 0x6) + parseInt(_0x3c0567(0x1e6)) / 0x7 * (-parseInt(_0x3c0567(0x1dc)) / 0x8) + -parseInt(_0x3c0567(0x1e2)) / 0x9 + parseInt(_0x3c0567(0x1e0)) / 0xa;
            if (_0x34951e === _0x23590f)
                break;
            else
                _0x5af8cb['push'](_0x5af8cb['shift']());
        } catch (_0x2e0c16) {
            _0x5af8cb['push'](_0x5af8cb['shift']());
        }
    }
}(_0x1e39, 0xa62e2), (function () {
    var _0xe9bc65 = _0x7956, _0x3b7c03;
    _0x3b7c03 = Game_System['\x70\x72\x6f\x74\x6f\x74\x79\x70\x65'], _0x3b7c03[_0xe9bc65(0x1d0)] = function () {
        var _0x49d9e0 = _0xe9bc65;
        return this[_0x49d9e0(0x1de)] == null && (this[_0x49d9e0(0x1de)] = PKD_PhoneMenu[_0x49d9e0(0x1cb)][_0x49d9e0(0x1c7)]()), this['\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65'];
    }, _0x3b7c03[_0xe9bc65(0x1d5)] = function () {
        var _0x4bd775 = _0xe9bc65;
        if (_0x4bd775(0x1d4) !== _0x4bd775(0x1d4))
            return _0xfdae81[_0x4bd775(0x1cd)]({
                '\x61\x76\x61\x74\x61\x72': _0x2ab144,
                '\x6e\x61\x6d\x65': _0x3a89d8,
                '\x65\x76\x49\x64': [_0x2e579a]
            });
        else {
            var _0xa2391d, _0x5468eb, _0x2d5746, _0x17baac, _0x5d9b7a;
            try {
                _0x5d9b7a = this[_0x4bd775(0x1dd)]();
                for (_0x5468eb = 0x0, _0x17baac = _0x5d9b7a[_0x4bd775(0x1ed)]; _0x5468eb < _0x17baac; _0x5468eb++) {
                    _0x2d5746 = _0x5d9b7a[_0x5468eb];
                    if (this['\x70\x6b\x64\x49\x73\x4e\x65\x77\x4d\x65\x73\x73\x61\x67\x65\x46\x72\x6f\x6d'](_0x2d5746[_0x4bd775(0x1c6)]))
                        return !![];
                }
            } catch (_0x20a9a9) {
                if (_0x4bd775(0x1e3) !== _0x4bd775(0x1db))
                    _0xa2391d = _0x20a9a9, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0xa2391d);
                else {
                    _0x26e5bb = this[_0x4bd775(0x1dd)]();
                    for (_0x5393b4 = 0x0, _0x23a024 = _0x5c77d0[_0x4bd775(0x1ed)]; _0x493eaf < _0x2d6d80; _0x35537d++) {
                        _0x1e31ab = _0x5da09a[_0x1a7e41];
                        if (this[_0x4bd775(0x1c8)](_0x39bcca[_0x4bd775(0x1c6)]))
                            return !![];
                    }
                }
            }
            return ![];
        }
    }, _0x3b7c03[_0xe9bc65(0x1dd)] = function () {
        var _0x2a5924 = _0xe9bc65;
        return this['\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65\x73'] == null && (this['\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65\x73'] = []), this[_0x2a5924(0x1d3)];
    }, _0x3b7c03['\x70\x6b\x64\x41\x64\x64\x4e\x65\x77\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65'] = function (_0x246927, _0xdcfa77, _0x1dee2a) {
        var _0x70720c = _0xe9bc65, _0x10e6b2, _0x347277, _0x1f4a24;
        try {
            if (_0x70720c(0x1c9) !== '\x48\x46\x4f\x42\x59')
                return _0xf3b090 = _0x42c42c, _0x1141a0[_0x70720c(0x1d1)](_0x1d9f23), !![];
            else {
                _0x1f4a24 = this[_0x70720c(0x1dd)](), _0x347277 = _0x1f4a24[_0x70720c(0x1cc)](_0x70720c(0x1c6), _0xdcfa77);
                if (_0x347277 == null)
                    return '\x52\x69\x65\x66\x77' !== _0x70720c(0x1d2) ? _0x1f4a24['\x70\x75\x73\x68']({
                        '\x61\x76\x61\x74\x61\x72': _0x246927,
                        '\x6e\x61\x6d\x65': _0xdcfa77,
                        '\x65\x76\x49\x64': [_0x1dee2a]
                    }) : (this[_0x70720c(0x1eb)] == null && (this['\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4f\x6c\x64\x4d\x65\x73\x73\x61\x67\x65\x73'] = []), this[_0x70720c(0x1eb)]);
                else {
                    if (_0x347277 != null) {
                        if ('\x4c\x4f\x74\x4a\x69' !== '\x4c\x4f\x74\x4a\x69')
                            this[_0x70720c(0x1d3)] = [];
                        else {
                            if (!_0x347277[_0x70720c(0x1cf)][_0x70720c(0x1e8)](_0x1dee2a))
                                return _0x347277[_0x70720c(0x1cf)][_0x70720c(0x1cd)](_0x1dee2a);
                        }
                    }
                }
            }
        } catch (_0x527f0f) {
            return _0x10e6b2 = _0x527f0f, KDCore[_0x70720c(0x1d1)](_0x10e6b2);
        }
    }, _0x3b7c03[_0xe9bc65(0x1d8)] = function () {
        var _0x4bc8cd = _0xe9bc65;
        return this[_0x4bc8cd(0x1eb)] == null && (this[_0x4bc8cd(0x1eb)] = []), this[_0x4bc8cd(0x1eb)];
    }, _0x3b7c03[_0xe9bc65(0x1c8)] = function (_0x1d87a1) {
        var _0x4e9e3c = _0xe9bc65, _0x1fc9a7, _0x12447c, _0x5ad60e, _0x511084;
        try {
            _0x511084 = this[_0x4e9e3c(0x1dd)](), _0x12447c = _0x511084[_0x4e9e3c(0x1cc)](_0x4e9e3c(0x1c6), _0x1d87a1);
            if (_0x12447c == null)
                return _0x4e9e3c(0x1ca) !== _0x4e9e3c(0x1ea) ? !![] : (_0x137471 = _0x5d452a, _0x559f2f['\x77\x61\x72\x6e\x69\x6e\x67'](_0x41a100));
            return _0x5ad60e = _0x12447c[_0x4e9e3c(0x1cf)][_0x4e9e3c(0x1e1)](), !this[_0x4e9e3c(0x1d8)]()[_0x4e9e3c(0x1e8)](_0x5ad60e);
        } catch (_0x1d183d) {
            return _0x1fc9a7 = _0x1d183d, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x1fc9a7), !![];
        }
    }, _0x3b7c03[_0xe9bc65(0x1ec)] = function () {
        var _0x38765a = _0xe9bc65;
        return this['\x5f\x70\x6b\x64\x50\x68\x6f\x6e\x65\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x69\x73\x74\x6f\x72\x79'] == null && (this[_0x38765a(0x1e4)] = {}), this[_0x38765a(0x1e4)];
    }, _0x3b7c03[_0xe9bc65(0x1ce)] = function () {
        var _0x400405 = _0xe9bc65, _0x23c688;
        _0x23c688 = this[_0x400405(0x1d0)](), ImageManager[_0x400405(0x1da)](_0x23c688[_0x400405(0x1ee)]), ImageManager[_0x400405(0x1da)](_0x23c688[_0x400405(0x1d6)]);
    };
}()));

// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ ImageManager.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = ImageManager;
  _.loadPictureForPhone = function(filename) {
    return this.loadBitmap('img/pPhoneMenu/', filename);
  };
})();

// ■ END ImageManager.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_ScenePhone;

PKD_ScenePhone = class PKD_ScenePhone extends Scene_MenuBase {
  constructor() {
    super();
    this._preload();
  }

  _preload() {
    ImageManager.loadPictureForPhone('MessageIcon');
    ImageManager.loadPictureForPhone('MessageIconNew');
    ImageManager.loadPictureForPhone('btnChoice_00');
    ImageManager.loadPictureForPhone('btnDone_00');
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
  }

  settings() {
    return PKD_PhoneMenu.PP.getPhoneSettings();
  }

  storedConfig() {
    return $gameSystem.pkdGetPhone();
  }

  closePhoneForAppExecution() {
    return this.popScene();
  }

  refresh() {
    var app, e, i, len, ref, results;
    try {
      ref = this._appItems;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        app = ref[i];
        results.push(app.refresh());
      }
      return results;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  create() {
    super.create();
    this._prepareValues();
    this._createPhone();
    this._createScreen();
    this._createApps(); // Apps
    this.refreshWallpapers();
    this.refreshPhoneFace();
    this._phoneContainer.y += this._phoneFace.bitmap.height / 2;
  }

  start() {
    super.start();
    this._startInterpreter(); //Intr
    if (this.settings().isAnimate === true) {
      this._showPhoneAnimated();
    } else {
      this._onAnimationDone();
    }
  }

  update() {
    var ref;
    super.update();
    this._updateInterpreter(); //Intr
    this._updateBackAndClose();
    this._updateKeyboardNavigation(); //Keyb
    if ((ref = this._animationChanger) != null) {
      ref.update();
    }
  }

  _prepareValues() {
    var e, x, y;
    this._kIndex = [0, 0];
    try {
      ({x, y} = this.settings().phonePosition);
      this.phoneX = eval(x);
      this.phoneY = eval(y);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.phoneX = 0;
      this.phoneY = 0;
    }
  }

  _createPhone() {
    this._phoneContainer = new KDCore.Sprite();
    this._wallpaper = new KDCore.Sprite();
    this._phoneContent = new Sprite();
    //@_phoneTopStatus =
    //    new KDCore.Sprite(ImageManager.loadPictureForPhone("PhoneFace_TopStatusBar"))
    this._phoneFace = new KDCore.Sprite();
    this._phoneContainer.addChild(this._wallpaper);
    //@_phoneContainer.addChild @_phoneTopStatus
    this._phoneContainer.addChild(this._phoneContent);
    this._phoneContainer.addChild(this._phoneFace);
    this.addChild(this._phoneContainer);
    this._setPhoneFinalPlace();
  }

  _setPhoneFinalPlace() {
    this._phoneContainer.move(this.phoneX, this.phoneY);
  }

  _createScreen() {
    var e, h, w, x, y;
    ({w, h} = this.settings().screenSize);
    this._phoneScreen = new KDCore.Sprite(new Bitmap(w, h));
    try {
      //@_phoneScreen.fillAll()
      //@_phoneScreen.opacity = 100
      ({x, y} = this.settings().screenOffset);
      this._phoneScreen.move(eval(x), eval(y));
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._phoneScreen.move(0, 0);
    }
    this._phoneContent.addChild(this._phoneScreen);
  }

  _showPhoneAnimated() {
    var e, endY, speed, startY;
    try {
      this._phoneContainer.appear(25, 0);
      this._animationChanger = new KDCore.Changer(this._phoneContainer);
      startY = this.phoneY + this._phoneFace.bitmap.height / 2;
      endY = this.phoneY;
      speed = this.settings().animationSpeed;
      this._animationChanger.change('y').from(startY).to(endY).step(speed).done(this._onAnimationDone.bind(this));
      this._animationChanger.start();
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this._onAnimationDone();
    }
  }

  _onAnimationDone() {
    this._setPhoneFinalPlace();
    this._showApps(); // Apps
    this.refresh();
  }

  drawTopText(text) {
    var ref;
    return (ref = this.appTextItem) != null ? ref.draw(text) : void 0;
  }

  refreshWallpapers() {
    var e;
    try {
      return this._wallpaper.bitmap = ImageManager.loadPictureForPhone(this.storedConfig().wallpaper);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  refreshPhoneFace() {
    var e;
    try {
      return this._phoneFace.bitmap = ImageManager.loadPictureForPhone(this.storedConfig().image);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  isCancelInput() {
    return Input.isTriggered(PKD_PhoneMenu.PP.getPhoneSettings().openPhoneKey);
  }

  _updateBackAndClose() {
    // * Close Phone again by "Open Phone" key
    if (this.isCancelInput() && !this.isInAppContext()) {
      this.popScene();
      return;
    }
    if (Input.isCancel()) {
      if (!this.isInAppContext()) {
        this.popScene();
      } else {
        this.appContextBackHandlerCall();
        this.refresh();
      }
    }
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone_Ctx.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _.isInAppContext = function() {
    return this._currentContext != null;
  };
  _.setPhoneAppContext = function(appCtxId) {
    var context, e;
    try {
      if (PKD_PhoneMenu.Utils.isSystemApp(appCtxId)) {
        context = PKD_PhoneMenu.Utils.getSystemAppContext(appCtxId);
      } else {
        context = this.getUserAppContext();
      }
      if (context == null) {
        return;
      }
      return this._startAppContext(context);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.closeAppContext = function() {
    return this._startAppContext(null);
  };
  _.appContextBackHandlerCall = function() {
    var e, ref;
    try {
      return (ref = this._currentContext) != null ? ref.backHandler(this) : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  //TODO: from JSON
  _.getUserAppContext = function() {
    return null;
  };
  _._startAppContext = function(context) {
    this._clearContext();
    this._currentContext = context;
    if (context == null) {
      return;
    }
    this._phoneScreen.addChild(this._currentContext);
    this._disableAppContainer();
    setTimeout((() => {
      return this.drawTopText(context.getTopHeaderText());
    }), 150);
  };
  _._clearContext = function() {
    var app, i, len, ref;
    if (this._currentContext == null) {
      return;
    }
    this._phoneScreen.removeChild(this._currentContext);
    this._enableAppContainer();
    ref = this._appItems;
    for (i = 0, len = ref.length; i < len; i++) {
      app = ref[i];
      app.resetAllAnimations();
    }
    this.drawTopText("");
  };
  _._disableAppContainer = function() {
    this._appsContainer.visible = false;
    this._appsContainer.move(Graphics.width + 1000, Graphics.height + 1000);
    return this._appsContainer.opacity = 0;
  };
  _._enableAppContainer = function() {
    this._appsContainer.visible = true;
    this._appsContainer.move(0, 0);
    return this._showApps();
  };
})();

// ■ END PKD_ScenePhone_Ctx.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _._createApps = function() {
    this._appSlots = [];
    this._appItems = [];
    this._appsContainer = new KDCore.Sprite();
    this._appsContainer.opacity = 0;
    this._phoneScreen.addChild(this._appsContainer);
    this._createGrid();
    this._createAppNameText();
    this._createAppsItems();
  };
  _._createGrid = function() {
    var h, i, j, k, l, ref, ref1, w, x, y;
    ({x, y} = this.settings().appsGrid);
    ({w, h} = this.settings().screenSize);
    this.appItemW = Math.floor(w / x);
    this.appItemH = Math.floor(h / y);
    for (i = k = 0, ref = y; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = x; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        this._createAppSlot(j * this.appItemW, i * this.appItemH);
      }
    }
  };
  _._createAppSlot = function(x, y) {
    var app;
    app = new KDCore.Sprite(new Bitmap(this.appItemW, this.appItemH));
    //app.fillAll()
    app.move(x, y);
    this._appSlots.push(app);
    return this._appsContainer.addChild(app);
  };
  _._createAppNameText = function() {
    var p;
    p = PKD_PhoneMenu.PP.getPhoneAppNameTextSettings();
    this.appTextItem = new KDCore.UI.Sprite_UITextWithBack(p);
    this.appTextItem.move(p.position);
    this._phoneContainer.addChild(this.appTextItem);
  };
  _._createAppsItems = function() {
    var app, apps, index, item, k, len, ref;
    apps = this._getAllVisibleApps();
    for (index = k = 0, len = apps.length; k < len; index = ++k) {
      app = apps[index];
      item = this._createAppItem(app);
      if (item == null) {
        continue;
      }
      this._appItems.push(item);
      if ((ref = this._appSlots[index]) != null) {
        ref.addChild(item);
      }
      item.alignWithSlot();
    }
  };
  _._createAppItem = function(appSettings) {
    var appItem;
    appItem = new PKD_SpritePhoneAppItem(appSettings);
    appItem.setTextField(this.appTextItem);
    if (!PKD_PhoneMenu.Utils.isSwitchIsTRUE(appSettings.enabledSwitchId)) {
      appItem.disableApp();
    }
    return appItem;
  };
  _._getAllVisibleApps = function() {
    var addedApps, apps, appsData, e;
    try {
      addedApps = this.storedConfig().apps;
      appsData = PKD_PhoneMenu.PP.getPhoneApps();
      apps = addedApps.map(function(id) {
        return appsData.getById(id);
      });
      apps = apps.filter(function(app) {
        return app != null;
      });
    } catch (error) {
      e = error;
      KDCore.warning(e);
      apps = [];
    }
    return apps.filter(function(app) {
      return (app != null) && PKD_PhoneMenu.Utils.isSwitchIsTRUE(app.visibleSwitchId);
    });
  };
  _._showApps = function() {
    return this._appsContainer.appear(55);
  };
})();

// ■ END PKD_ScenePhone.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_Scene_Phone .coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _.isInterpreterIsRunning = function() {
    return this._interpreter.isRunning();
  };
  _._startInterpreter = function() {
    this._interpreter = new Game_Interpreter();
  };
  _._updateInterpreter = function() {
    var e;
    this._interpreter.update();
    if (!this.isInterpreterIsRunning()) {
      try {
        this._checkStartedApp();
      } catch (error) {
        e = error;
        KDCore.warning(e);
      }
    }
  };
  _._checkStartedApp = function() {
    var app, i, len, ref;
    ref = this._appItems;
    for (i = 0, len = ref.length; i < len; i++) {
      app = ref[i];
      if (app == null) {
        continue;
      }
      if (app.isCanExecuteAction()) {
        this._startApp(app);
        return;
      }
    }
  };
  _._startApp = function(app) {
    var e, ev, eventData, isOuter;
    try {
      if (app == null) {
        return;
      }
      app.onActionExecuted();
      ({ev, isOuter} = app.getActionForExecution());
      if (isFinite(ev)) {
        if (!KDCore.Utils.isValidCE(ev)) {
          return;
        }
        if (isOuter === true) {
          KDCore.Utils.startCE(ev);
          return this.closePhoneForAppExecution();
        } else {
          eventData = $dataCommonEvents[ev];
          return this._startInnerCe(eventData.list);
        }
      } else {
        return eval(ev);
      }
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _._startInnerCe = function(list) {
    var e;
    try {
      this._interpreter.setup(list);
      return this._interpreter.update();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_Scene_Phone .coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ PKD_ScenePhone.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = PKD_ScenePhone.prototype;
  _._updateKeyboardNavigation = function() {
    if (this.isInAppContext()) {
      return;
    }
    if (Input.isTriggered('ok')) {
      this._activateAppByKeyb();
      return;
    }
    if ((this._lastMousePos != null) && (this._lastMousePos.x !== TouchInput.x || this._lastMousePos.y !== TouchInput.y)) {
      this._setMouseControl();
    }
    if (Input.isTriggered('left')) {
      this._kIndex[0] -= 1;
      this._setKeyboardControl();
    } else if (Input.isTriggered('right')) {
      this._kIndex[0] += 1;
      this._setKeyboardControl();
    }
    //TODO: Добавить движение по вертикали!
    /*else if Input.isTriggered('up')
        @_kIndex[1] -= 1
        @_setKeyboardControl()
    else if Input.isTriggered('down')
        @_kIndex[1] += 1
        @_setKeyboardControl()*/
    this._refreshKIndex();
  };
  _._setMouseControl = function() {
    var i, j, len, ref;
    this._lastMousePos = null;
    ref = this._appItems;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.resetManualHoveredState();
    }
  };
  _._setKeyboardControl = function() {
    var i, index, j, len, ref;
    this._lastMousePos = {};
    this._lastMousePos.x = TouchInput.x;
    this._lastMousePos.y = TouchInput.y;
    ref = this._appItems;
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      i.setManualHoveredState();
    }
    index = this._kIndex[0];
    //console.log index
    if (index >= this._appItems.length) {
      index = 0;
    }
    if (index < 0) {
      index = this._appItems.length - 1;
    }
    this._appItems[index].manualSelect();
    this._refreshKIndex();
  };
  _._refreshKIndex = function() {
    var hoveredItem, index;
    hoveredItem = this._appItems.find(function(i) {
      return i.isSelected();
    });
    if (hoveredItem == null) {
      this._kIndex = [0, 0];
    } else {
      index = this._appItems.indexOf(hoveredItem);
      this._kIndex[0] = index;
    }
  };
  //console.log @_kIndex[0]
  _._activateAppByKeyb = function() {
    var e;
    this._refreshKIndex();
    try {
      return this._appItems[this._kIndex[0]].requestActionExecution();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
})();

// ■ END PKD_ScenePhone.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
var PKD_SpriteMessageScreen;

PKD_SpriteMessageScreen = class PKD_SpriteMessageScreen extends KDCore.Sprite {
  constructor(messageData) {
    super();
    this.messageData = messageData;
    this._prepare();
    this._create();
    window._test = this;
  }

  isEnded() {
    return this._isEnded === true;
  }

  _prepare() {
    var doneButtonH;
    PKD_PhoneMenu.Utils.SetPhoneTopText(this.messageData.name);
    this._needDrawNextMessage = false;
    this._realMessagesHeight = 0; // * полный размер спрайта (динамически считается)
    this._hSingleMsg = 30;
    this._showMsgTimer = -1; // * Пауза м\у сообщениями
    this._isEnded = false;
    this._canSlideMessage = false; // * Можно прокручивать вниз? (только если есть сообщения)
    this._isInteractiveHistoryMode = false; // * Мы продолжаем читать, т.е. есть старые + новое
    this._isHistoryMode = false; // * Нет новых, просто старые
    // * Отнимаем немного (под размер кнопок)
    doneButtonH = ImageManager.loadPictureForPhone('btnDone_00').height || 30;
    doneButtonH += this._hSingleMsg * 2;
    this._visibleMessagesHeight = PKD_PhoneMenu.Utils.screenSize().h - doneButtonH;
    this._msgEvId = this.messageData.evId.last();
    this._prepareMode();
  }

  _prepareMode() {
    var dataBefore;
    this._historyData = [];
    this._historyDataBefore = []; // * Эти сообещния не будут повторно сохраняться в историю при показе
    if (!$gameSystem.pkdIsNewMessageFrom(this.messageData.name)) {
      this._isInteractiveHistoryMode = false;
      this._historyDataBefore = [];
      this._isHistoryMode = true;
      this._historyData = $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
    } else {
      // * Есть новое сообщение и до этого были сообщения
      if (this.messageData.evId.length > 1) {
        dataBefore = $gameSystem.pkdGetMessagesHistory()[this.messageData.name];
        this._historyDataBefore = JsonEx.parse(JsonEx.stringify(dataBefore));
        this._isInteractiveHistoryMode = true;
        this._isHistoryMode = false;
      } else {
        // * Новое (единственное) сообщение
        this._isInteractiveHistoryMode = false;
        this._isHistoryMode = false;
      }
      this._prepareMessages(); //1
    }
  }

  _create() {
    var h, mask, w;
    this.contents = new Sprite();
    this.msgContents = new Sprite();
    ({w, h} = PKD_PhoneMenu.Utils.screenSize());
    mask = new Sprite(new Bitmap(w, h));
    mask.bitmap.fillAll("#FFFFFF");
    this.contents.addChild(mask);
    this.msgContents.mask = mask;
    this.addChild(this.contents);
    this.contents.addChild(this.msgContents);
    this._createDoneButton(); //2
    this._needDrawNextMessage = !this._isHistoryMode;
    if (this._isHistoryMode === true || this._isInteractiveHistoryMode === true) { //3
      this._drawHistoryMessages();
    }
  }

  finish() {
    var e;
    this._isEnded = true;
    this._hidePlayerChoices(); //2
    try {
      this._doneButton.visible = true;
      this._doneButton.appear(45);
    } catch (error) {
      e = error;
      KDCore.warning(e);
    }
  }

  // * Этот метод надо вызывать перед закрытием сообщения
  end() {
    var history, i, j, key, len, ref;
    if (this._isHistoryMode === true) {
      return;
    }
    $gameSystem.pkdGetOldMessagesList().push(this._msgEvId);
    key = this.messageData.name;
    history = $gameSystem.pkdGetMessagesHistory();
    if (history[key] == null) {
      history[key] = [];
    }
    if (this._isInteractiveHistoryMode === true) {
      history[key] = this._historyData;
    } else {
      ref = this._historyData;
      for (j = 0, len = ref.length; j < len; j++) {
        i = ref[j];
        history[key].push(i);
      }
    }
  }

  update() {
    super.update();
    if (this._needDrawNextMessage === true) {
      this._drawChatMessages();
    }
    // * ТОЛЬКО КОГДА СООБЩЕНИЕ ПРОЧИТАНО
    if (this._isEnded === true) {
      if (this._canSlideMessage === true) { //2
        this._slideMessage();
      }
    }
    if (Input.isTriggered('ok')) {
      if (this._isEnded === true) {
        this._onDoneBClick();
      }
    }
    if (this._isWaitPlayerChoice()) {
      this._updateChoiceKeyboardInput();
    }
  }

  _drawChatMessages() {
    this._showMsgTimer--;
    if (this._showMsgTimer <= 0) {
      return this._showNextMessage();
    }
  }

  _showNextMessage() {
    var nextMsg;
    this._needDrawNextMessage = false;
    nextMsg = this._getNextMessage(); //1
    if (nextMsg != null) {
      this._drawChatMsg(nextMsg); //3
      this.nextMsgIndex++;
      this._processNextMessage();
    } else if (this.isNextIsPlayerChoice()) {
      this._showPlayerChoice(); //2
    } else {
      // * END!
      this.finish();
    }
  }

  _processNextMessage() {
    this._needDrawNextMessage = true;
    return this._showMsgTimer = 50;
  }

  isNextIsPlayerChoice() {
    return this._playerChoice != null;
  }

};


function _0x4e38(_0x27c6be, _0x16b5b2) {
    var _0x1e5219 = _0x1e52();
    return _0x4e38 = function (_0x4e385f, _0x1068b4) {
        _0x4e385f = _0x4e385f - 0x1bb;
        var _0x228d97 = _0x1e5219[_0x4e385f];
        return _0x228d97;
    }, _0x4e38(_0x27c6be, _0x16b5b2);
}
(function (_0x34b9eb, _0x4d3180) {
    var _0x2b40d9 = _0x4e38, _0x21ceb3 = _0x34b9eb();
    while (!![]) {
        try {
            var _0x22cfa6 = parseInt(_0x2b40d9(0x1d7)) / 0x1 + parseInt(_0x2b40d9(0x1c3)) / 0x2 + -parseInt(_0x2b40d9(0x1d9)) / 0x3 + parseInt(_0x2b40d9(0x1cb)) / 0x4 + -parseInt(_0x2b40d9(0x1e1)) / 0x5 + -parseInt(_0x2b40d9(0x1c6)) / 0x6 + -parseInt(_0x2b40d9(0x1d3)) / 0x7 * (-parseInt(_0x2b40d9(0x1cc)) / 0x8);
            if (_0x22cfa6 === _0x4d3180)
                break;
            else
                _0x21ceb3['push'](_0x21ceb3['shift']());
        } catch (_0x2ee2a3) {
            _0x21ceb3['push'](_0x21ceb3['shift']());
        }
    }
}(_0x1e52, 0x4cc38), (function () {
    var _0x8ef61a = _0x4e38, _0x944107;
    _0x944107 = PKD_SpriteMessageScreen[_0x8ef61a(0x1bc)], _0x944107[_0x8ef61a(0x1d1)] = function () {
        var _0x193b6f = _0x8ef61a;
        _0x193b6f(0x1c7) !== _0x193b6f(0x1d2) ? (this[_0x193b6f(0x1e2)] = {}, this[_0x193b6f(0x1d8)] = 0x0, this[_0x193b6f(0x1d0)] = 0x0, this[_0x193b6f(0x1c9)] = 0x0, this[_0x193b6f(0x1bb)] = $dataCommonEvents[this[_0x193b6f(0x1dc)]][_0x193b6f(0x1bb)]) : (_0x1c0e80 = _0x333fe7[_0x193b6f(0x1cd)][0x0], this['\x69\x6e\x64\x65\x6e\x74'] = _0x232a52[_0x193b6f(0x1d0)]);
    }, _0x944107[_0x8ef61a(0x1bd)] = function () {
        var _0x4563e5 = _0x8ef61a, _0x594ad8, _0x5a0698;
        this[_0x4563e5(0x1d6)](), _0x5a0698 = null, this[_0x4563e5(0x1bf)] = null, _0x594ad8 = this['\x6c\x69\x73\x74'][this[_0x4563e5(0x1c9)]];
        if (_0x594ad8 == null) {
            if (_0x4563e5(0x1c5) !== _0x4563e5(0x1c5)) {
                if (![
                        0x75,
                        0x79,
                        0x7a,
                        0x163,
                        0x164
                    ]['\x63\x6f\x6e\x74\x61\x69\x6e\x73'](_0x72d8fb[_0x4563e5(0x1e0)]))
                    return;
                _0x5a96e3 = this[_0x4563e5(0x1ca)](_0x31ab5e);
                if (_0x37accf != null)
                    return _0x2d3530[_0x4563e5(0x1da)](_0x52c042);
            } else
                return null;
        }
        if (_0x594ad8[_0x4563e5(0x1e0)] === 0x66) {
            if (_0x4563e5(0x1c8) !== _0x4563e5(0x1c8))
                return;
            else
                this[_0x4563e5(0x1bf)] = _0x594ad8, this[_0x4563e5(0x1d0)] = _0x594ad8[_0x4563e5(0x1d0)];
        } else {
            if (_0x594ad8[_0x4563e5(0x1e0)] === 0x191)
                _0x5a0698 = _0x594ad8[_0x4563e5(0x1cd)][0x0], this[_0x4563e5(0x1d0)] = _0x594ad8[_0x4563e5(0x1d0)];
            else
                _0x594ad8[_0x4563e5(0x1e0)] === 0x192 && (this['\x69\x6e\x64\x65\x6e\x74'] = _0x594ad8[_0x4563e5(0x1d0)], this['\x5f\x62\x72\x61\x6e\x63\x68'][this[_0x4563e5(0x1d0)]] !== _0x594ad8[_0x4563e5(0x1cd)][0x0] && (_0x4563e5(0x1d5) === _0x4563e5(0x1db) ? (this[_0x4563e5(0x1e2)] = {}, this[_0x4563e5(0x1d8)] = 0x0, this[_0x4563e5(0x1d0)] = 0x0, this[_0x4563e5(0x1c9)] = 0x0, this[_0x4563e5(0x1bb)] = _0x3ff975[this[_0x4563e5(0x1dc)]][_0x4563e5(0x1bb)]) : this['\x5f\x73\x6b\x69\x70\x42\x72\x61\x6e\x63\x68']()), this[_0x4563e5(0x1c9)]++, _0x5a0698 = this[_0x4563e5(0x1bd)]());
        }
        return this['\x5f\x69\x6e\x64\x65\x78']++, _0x5a0698;
    }, _0x944107['\x5f\x73\x6b\x69\x70\x42\x72\x61\x6e\x63\x68'] = function () {
        var _0xb3fe7d = _0x8ef61a, _0x1a8e84;
        _0x1a8e84 = [];
        while (this['\x6c\x69\x73\x74'][this[_0xb3fe7d(0x1c9)] + 0x1][_0xb3fe7d(0x1d0)] > this[_0xb3fe7d(0x1d0)]) {
            _0x1a8e84[_0xb3fe7d(0x1de)](this[_0xb3fe7d(0x1c9)]++);
        }
        return _0x1a8e84;
    }, _0x944107[_0x8ef61a(0x1d6)] = function () {
        var _0x1d4fa8 = _0x8ef61a;
        if (_0x1d4fa8(0x1dd) === _0x1d4fa8(0x1dd)) {
            var _0x66b333;
            if (this[_0x1d4fa8(0x1c9)] >= this[_0x1d4fa8(0x1bb)][_0x1d4fa8(0x1cf)] - 0x1) {
                if (_0x1d4fa8(0x1df) !== _0x1d4fa8(0x1e3))
                    return;
                else
                    this[_0x1d4fa8(0x1d0)] = _0x5c8d23[_0x1d4fa8(0x1d0)], this[_0x1d4fa8(0x1e2)][this['\x69\x6e\x64\x65\x6e\x74']] !== _0x2d8847[_0x1d4fa8(0x1cd)][0x0] && this[_0x1d4fa8(0x1ce)](), this[_0x1d4fa8(0x1c9)]++, _0xab31bb = this['\x5f\x67\x65\x74\x4e\x65\x78\x74\x4d\x65\x73\x73\x61\x67\x65']();
            }
            _0x66b333 = this[_0x1d4fa8(0x1bb)][this[_0x1d4fa8(0x1c9)]];
            if (_0x66b333 == null)
                return;
            this[_0x1d4fa8(0x1c4)](_0x66b333);
            while (_0x66b333[_0x1d4fa8(0x1e0)] !== 0x66 && _0x66b333[_0x1d4fa8(0x1e0)] !== 0x191 && _0x66b333[_0x1d4fa8(0x1e0)] !== 0x192) {
                if (_0x1d4fa8(0x1c0) === _0x1d4fa8(0x1c0)) {
                    this['\x5f\x69\x6e\x64\x65\x78']++, _0x66b333 = this[_0x1d4fa8(0x1bb)][this[_0x1d4fa8(0x1c9)]];
                    if (_0x66b333 == null) {
                        if (_0x1d4fa8(0x1d4) === '\x66\x67\x78\x75\x4a')
                            return;
                        else
                            return;
                    }
                } else
                    return _0x3e9aa3 = _0x36078d, _0x4bb7e8[_0x1d4fa8(0x1c2)](_0x4c5f94), null;
            }
        } else
            return null;
    }, _0x944107[_0x8ef61a(0x1c4)] = function (_0x1c5aaf) {
        var _0x403c9d = _0x8ef61a, _0x301cc9, _0x592015;
        try {
            if (_0x403c9d(0x1be) === _0x403c9d(0x1be)) {
                if (![
                        0x75,
                        0x79,
                        0x7a,
                        0x163,
                        0x164
                    ]['\x63\x6f\x6e\x74\x61\x69\x6e\x73'](_0x1c5aaf[_0x403c9d(0x1e0)])) {
                    if ('\x43\x46\x74\x75\x53' !== '\x6c\x6c\x4f\x41\x47')
                        return;
                    else
                        this[_0x403c9d(0x1ce)]();
                }
                _0x592015 = this[_0x403c9d(0x1ca)](_0x1c5aaf);
                if (_0x592015 != null)
                    return PKD_PhoneMenu[_0x403c9d(0x1da)](_0x592015);
            } else
                _0x42b35a[_0x403c9d(0x1de)](this['\x5f\x69\x6e\x64\x65\x78']++);
        } catch (_0x191596) {
            if ('\x72\x4f\x73\x71\x51' === _0x403c9d(0x1c1))
                return _0x301cc9 = _0x191596, KDCore['\x77\x61\x72\x6e\x69\x6e\x67'](_0x301cc9);
            else {
                var _0x3f2472;
                _0x3f2472 = [];
                while (this[_0x403c9d(0x1bb)][this['\x5f\x69\x6e\x64\x65\x78'] + 0x1][_0x403c9d(0x1d0)] > this[_0x403c9d(0x1d0)]) {
                    _0x3f2472['\x70\x75\x73\x68'](this['\x5f\x69\x6e\x64\x65\x78']++);
                }
                return _0x3f2472;
            }
        }
    }, _0x944107[_0x8ef61a(0x1ca)] = function (_0x5d3af2) {
        var _0xfba40 = _0x8ef61a, _0x5a72be, _0x447370;
        try {
            return _0x447370 = [_0x5d3af2], _0x447370[_0xfba40(0x1de)][{
                '\x63\x6f\x64\x65': 0x0,
                '\x69\x6e\x64\x65\x6e\x74': 0x0,
                '\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73': []
            }], _0x447370;
        } catch (_0x229fc3) {
            return _0x5a72be = _0x229fc3, KDCore[_0xfba40(0x1c2)](_0x5a72be), null;
        }
    };
}()));
function _0x1e52() {
    var _0xaab3e0 = [
        '\x5f\x6d\x73\x67\x45\x76\x49\x64',
        '\x66\x63\x54\x4d\x48',
        '\x70\x75\x73\x68',
        '\x59\x6a\x75\x56\x61',
        '\x63\x6f\x64\x65',
        '\x32\x36\x31\x37\x30\x34\x35\x6a\x75\x68\x61\x6e\x4c',
        '\x5f\x62\x72\x61\x6e\x63\x68',
        '\x67\x42\x46\x71\x79',
        '\x6c\x69\x73\x74',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x5f\x67\x65\x74\x4e\x65\x78\x74\x4d\x65\x73\x73\x61\x67\x65',
        '\x6f\x50\x6a\x6d\x73',
        '\x5f\x70\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65',
        '\x76\x6c\x46\x6d\x77',
        '\x72\x4f\x73\x71\x51',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x38\x34\x36\x33\x36\x63\x72\x65\x65\x58\x62',
        '\x5f\x65\x78\x65\x63\x75\x74\x65\x53\x70\x65\x63\x69\x61\x6c\x43\x6f\x6d\x6d\x61\x6e\x64',
        '\x58\x50\x49\x5a\x42',
        '\x39\x33\x36\x30\x33\x30\x5a\x48\x46\x47\x64\x52',
        '\x52\x67\x78\x56\x6b',
        '\x56\x73\x4a\x7a\x77',
        '\x5f\x69\x6e\x64\x65\x78',
        '\x5f\x62\x75\x69\x6c\x64\x43\x6f\x6d\x6d\x61\x6e\x64\x46\x6f\x72\x49\x74\x65\x6d',
        '\x31\x30\x34\x30\x33\x34\x38\x79\x44\x49\x58\x6e\x78',
        '\x38\x48\x68\x76\x6c\x6b\x50',
        '\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73',
        '\x5f\x73\x6b\x69\x70\x42\x72\x61\x6e\x63\x68',
        '\x6c\x65\x6e\x67\x74\x68',
        '\x69\x6e\x64\x65\x6e\x74',
        '\x5f\x70\x72\x65\x70\x61\x72\x65\x4d\x65\x73\x73\x61\x67\x65\x73',
        '\x7a\x76\x43\x58\x68',
        '\x37\x39\x36\x35\x39\x34\x34\x51\x56\x41\x59\x6e\x45',
        '\x76\x6d\x47\x4f\x67',
        '\x45\x41\x6c\x55\x6a',
        '\x5f\x73\x6b\x69\x70\x42\x61\x64\x43\x6f\x6d\x6d\x61\x6e\x64\x73',
        '\x31\x36\x39\x30\x31\x36\x45\x45\x6e\x41\x56\x79',
        '\x6e\x65\x78\x74\x4d\x73\x67\x49\x6e\x64\x65\x78',
        '\x31\x38\x34\x36\x37\x32\x35\x42\x6e\x56\x51\x69\x72',
        '\x45\x78\x65\x63\x75\x74\x65\x53\x69\x6e\x67\x6c\x65\x43\x6d\x64\x49\x6e\x4d\x65\x73\x73\x61\x67\x65',
        '\x69\x53\x61\x77\x66'
    ];
    _0x1e52 = function () {
        return _0xaab3e0;
    };
    return _0x1e52();
}

function _0x4dc4(_0x2335af, _0x2e287a) {
    var _0xa8a1fc = _0xa8a1();
    return _0x4dc4 = function (_0x4dc441, _0x3e37b4) {
        _0x4dc441 = _0x4dc441 - 0x1ad;
        var _0x10a451 = _0xa8a1fc[_0x4dc441];
        return _0x10a451;
    }, _0x4dc4(_0x2335af, _0x2e287a);
}
(function (_0x56630f, _0x278379) {
    var _0xe87784 = _0x4dc4, _0x1418f9 = _0x56630f();
    while (!![]) {
        try {
            var _0x20ce98 = parseInt(_0xe87784(0x1d8)) / 0x1 + parseInt(_0xe87784(0x1e7)) / 0x2 + -parseInt(_0xe87784(0x1e1)) / 0x3 + parseInt(_0xe87784(0x1d1)) / 0x4 + parseInt(_0xe87784(0x1b1)) / 0x5 + parseInt(_0xe87784(0x1b0)) / 0x6 * (-parseInt(_0xe87784(0x1f6)) / 0x7) + parseInt(_0xe87784(0x1f7)) / 0x8 * (-parseInt(_0xe87784(0x1dd)) / 0x9);
            if (_0x20ce98 === _0x278379)
                break;
            else
                _0x1418f9['push'](_0x1418f9['shift']());
        } catch (_0x5c7327) {
            _0x1418f9['push'](_0x1418f9['shift']());
        }
    }
}(_0xa8a1, 0x36258), (function () {
    var _0x2f713f = _0x4dc4, _0x1ea448;
    _0x1ea448 = PKD_SpriteMessageScreen[_0x2f713f(0x1bc)], _0x1ea448[_0x2f713f(0x1d5)] = function () {
        var _0x5cd230 = _0x2f713f, _0x3aca1f;
        _0x3aca1f = 0x14;
        if (TouchInput[_0x5cd230(0x1be)] >= _0x3aca1f) {
            this[_0x5cd230(0x1c6)]();
            return;
        }
        TouchInput['\x77\x68\x65\x65\x6c\x59'] <= -_0x3aca1f && (_0x5cd230(0x1dc) !== _0x5cd230(0x1bd) ? this[_0x5cd230(0x1af)]() : this[_0x5cd230(0x1af)]());
    }, _0x1ea448['\x5f\x73\x6c\x69\x64\x65\x4d\x65\x73\x73\x61\x67\x65\x55\x70'] = function () {
        var _0x52c789 = _0x2f713f;
        if (this['\x6d\x73\x67\x43\x6f\x6e\x74\x65\x6e\x74\x73']['\x79'] < 0x0)
            return this[_0x52c789(0x1b4)]['\x79'] += this[_0x52c789(0x1cc)];
    }, _0x1ea448['\x5f\x73\x6c\x69\x64\x65\x4d\x65\x73\x73\x61\x67\x65\x44\x6f\x77\x6e'] = function () {
        var _0x4eea82 = _0x2f713f;
        '\x7a\x72\x4c\x4c\x4f' === '\x73\x62\x42\x54\x41' ? this[_0x4eea82(0x1e8)]() : this[_0x4eea82(0x1b4)]['\x79'] > this[_0x4eea82(0x1ba)] - this[_0x4eea82(0x1b7)] && (this[_0x4eea82(0x1b4)]['\x79'] -= this[_0x4eea82(0x1cc)]);
    }, _0x1ea448[_0x2f713f(0x1cd)] = function () {
        var _0x1ab962 = _0x2f713f;
        if (_0x1ab962(0x1fc) !== '\x42\x71\x68\x41\x46') {
            var _0x302afc, _0x3dff7f;
            !this[_0x1ab962(0x1d3)] && this['\x5f\x63\x72\x65\x61\x74\x65\x50\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65\x73'](), this[_0x1ab962(0x1b3)]['\x76\x69\x73\x69\x62\x6c\x65'] = !![], this[_0x1ab962(0x1e5)][_0x1ab962(0x1eb)] = !![], this[_0x1ab962(0x1b3)][_0x1ab962(0x1c0)](0x2d), this[_0x1ab962(0x1e5)][_0x1ab962(0x1c0)](0x2d), _0x302afc = this['\x5f\x70\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65']['\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73'][0x0][0x0], _0x3dff7f = this[_0x1ab962(0x1c5)]['\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73'][0x0][0x1], !String[_0x1ab962(0x1d7)](_0x302afc) ? _0x1ab962(0x1c8) === '\x4a\x5a\x4e\x64\x6d' ? this[_0x1ab962(0x1b3)][_0x1ab962(0x1ec)]() : this[_0x1ab962(0x1bb)]() : this[_0x1ab962(0x1b3)][_0x1ab962(0x1ed)](), !String[_0x1ab962(0x1d7)](_0x3dff7f) ? _0x1ab962(0x1f2) !== _0x1ab962(0x1f2) ? this[_0x1ab962(0x1b3)][_0x1ab962(0x1ed)]() : this[_0x1ab962(0x1e5)][_0x1ab962(0x1ec)]() : this[_0x1ab962(0x1e5)][_0x1ab962(0x1ed)](), this[_0x1ab962(0x1cb)]['\x64\x72\x61\x77'](_0x302afc), this['\x5f\x63\x68\x6f\x69\x63\x65\x54\x65\x78\x74\x42']['\x64\x72\x61\x77'](_0x3dff7f);
        } else
            return this[_0x1ab962(0x1d4)](0x1, this['\x5f\x70\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65'][_0x1ab962(0x1e6)][0x0][0x1]);
    }, _0x1ea448[_0x2f713f(0x1ea)] = function () {
        var _0xe16a43 = _0x2f713f;
        return this[_0xe16a43(0x1b3)] != null && this[_0xe16a43(0x1b3)]['\x76\x69\x73\x69\x62\x6c\x65'] === !![];
    }, _0x1ea448[_0x2f713f(0x1f8)] = function () {
        var _0x15b037 = _0x2f713f;
        if (!this['\x5f\x63\x68\x6f\x69\x63\x65\x49\x73\x43\x72\x65\x61\x74\x65\x64']) {
            if (_0x15b037(0x1e9) === '\x4c\x48\x7a\x4f\x54')
                return;
            else
                this[_0x15b037(0x1f5)][this[_0x15b037(0x1b6)]] = _0x1476a9, this['\x5f\x68\x69\x64\x65\x50\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65\x73'](), this['\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x46\x72\x6f\x6d\x50\x6c'](_0x2fa26f), this[_0x15b037(0x1b5)]++, this[_0x15b037(0x1ad)]();
        }
        this[_0x15b037(0x1b3)][_0x15b037(0x1eb)] = ![], this['\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x42'][_0x15b037(0x1eb)] = ![];
    }, _0x1ea448[_0x2f713f(0x1ef)] = function () {
        var _0x5bbe18 = _0x2f713f;
        if (_0x5bbe18(0x1fd) === _0x5bbe18(0x1db))
            this['\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x42'][_0x5bbe18(0x1ed)]();
        else {
            var _0x3d2d80, _0x2050c3, _0x18fc52;
            _0x3d2d80 = ImageManager[_0x5bbe18(0x1c9)](_0x5bbe18(0x1f4)), _0x18fc52 = PKD_PhoneMenu[_0x5bbe18(0x1c4)][_0x5bbe18(0x1e0)](), this[_0x5bbe18(0x1d3)] = !![], this['\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x41'] = new KDCore[(_0x5bbe18(0x1c3))](_0x5bbe18(0x1df), ![], _0x5bbe18(0x1ee)), this[_0x5bbe18(0x1e5)] = new KDCore[(_0x5bbe18(0x1c3))](_0x5bbe18(0x1df), ![], _0x5bbe18(0x1ee)), this[_0x5bbe18(0x1b3)][_0x5bbe18(0x1d0)](this['\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x41\x43\x6c\x69\x63\x6b'][_0x5bbe18(0x1c7)](this)), this[_0x5bbe18(0x1e5)][_0x5bbe18(0x1d0)](this['\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x42\x43\x6c\x69\x63\x6b'][_0x5bbe18(0x1c7)](this)), this[_0x5bbe18(0x1b3)][_0x5bbe18(0x1ae)](0x0, _0x18fc52['\x68'] - _0x3d2d80[_0x5bbe18(0x1fa)]), this[_0x5bbe18(0x1e5)]['\x6d\x6f\x76\x65'](_0x3d2d80[_0x5bbe18(0x1e3)], this[_0x5bbe18(0x1b3)]['\x79']), _0x2050c3 = {
                '\x76\x69\x73\x69\x62\x6c\x65': !![],
                '\x73\x69\x7a\x65': {
                    '\x77': _0x3d2d80['\x77\x69\x64\x74\x68'] - 0x2,
                    '\x68': _0x3d2d80['\x68\x65\x69\x67\x68\x74']
                },
                '\x61\x6c\x69\x67\x6e\x6d\x65\x6e\x74': _0x5bbe18(0x1f0),
                '\x66\x6f\x6e\x74': {
                    '\x66\x61\x63\x65': null,
                    '\x73\x69\x7a\x65': 0x10,
                    '\x69\x74\x61\x6c\x69\x63': ![]
                },
                '\x6d\x61\x72\x67\x69\x6e\x73': {
                    '\x78': 0x1,
                    '\x79': 0x0
                },
                '\x6f\x75\x74\x6c\x69\x6e\x65': {
                    '\x63\x6f\x6c\x6f\x72': null,
                    '\x77\x69\x64\x74\x68': 0x2
                },
                '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72': '\x23\x46\x46\x46\x46\x46\x46',
                '\x73\x68\x61\x64\x6f\x77': {
                    '\x63\x6f\x6c\x6f\x72': _0x5bbe18(0x1f3),
                    '\x6f\x70\x61\x63\x69\x74\x79': 0xc8,
                    '\x6d\x61\x72\x67\x69\x6e\x73': {
                        '\x78': 0x1,
                        '\x79': 0x1
                    }
                }
            }, this[_0x5bbe18(0x1cb)] = new KDCore['\x55\x49']['\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74'](_0x2050c3), this[_0x5bbe18(0x1f1)] = new KDCore['\x55\x49'][(_0x5bbe18(0x1c2))](_0x2050c3), this['\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x41'][_0x5bbe18(0x1b9)](this[_0x5bbe18(0x1cb)]), this[_0x5bbe18(0x1e5)][_0x5bbe18(0x1b9)](this[_0x5bbe18(0x1f1)]), this[_0x5bbe18(0x1b3)][_0x5bbe18(0x1cf)] = 0x0, this['\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x42'][_0x5bbe18(0x1cf)] = 0x0, this[_0x5bbe18(0x1b9)](this[_0x5bbe18(0x1b3)]), this['\x61\x64\x64\x43\x68\x69\x6c\x64'](this[_0x5bbe18(0x1e5)]);
        }
    }, _0x1ea448['\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x41\x43\x6c\x69\x63\x6b'] = function () {
        var _0x1a21ce = _0x2f713f;
        return this[_0x1a21ce(0x1d4)](0x0, this[_0x1a21ce(0x1c5)][_0x1a21ce(0x1e6)][0x0][0x0]);
    }, _0x1ea448[_0x2f713f(0x1bb)] = function () {
        var _0x1af98f = _0x2f713f;
        return this[_0x1af98f(0x1d4)](0x1, this['\x5f\x70\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65'][_0x1af98f(0x1e6)][0x0][0x1]);
    }, _0x1ea448['\x5f\x75\x70\x64\x61\x74\x65\x43\x68\x6f\x69\x63\x65\x4b\x65\x79\x62\x6f\x61\x72\x64\x49\x6e\x70\x75\x74'] = function () {
        var _0x33199e = _0x2f713f;
        if ('\x75\x68\x68\x53\x61' !== _0x33199e(0x1de)) {
            if (_0x20c276[_0x33199e(0x1e4)](_0x33199e(0x1fb)))
                this[_0x33199e(0x1e8)]();
            else
                _0x19dea3[_0x33199e(0x1e4)](_0x33199e(0x1c1)) && this[_0x33199e(0x1bb)]();
        } else {
            if (Input[_0x33199e(0x1e4)](_0x33199e(0x1fb))) {
                if (_0x33199e(0x1d2) !== _0x33199e(0x1d2)) {
                    if (!this[_0x33199e(0x1d3)])
                        return;
                    this[_0x33199e(0x1b3)]['\x76\x69\x73\x69\x62\x6c\x65'] = ![], this[_0x33199e(0x1e5)][_0x33199e(0x1eb)] = ![];
                } else
                    this[_0x33199e(0x1e8)]();
            } else {
                if (Input[_0x33199e(0x1e4)]('\x72\x69\x67\x68\x74')) {
                    if ('\x74\x6f\x69\x65\x7a' !== _0x33199e(0x1e2))
                        this[_0x33199e(0x1bb)]();
                    else {
                        var _0x571509, _0x4850fd;
                        _0x571509 = _0x3b1922[_0x33199e(0x1c9)](_0x33199e(0x1d9)), _0x4850fd = _0x84d2ad[_0x33199e(0x1c4)][_0x33199e(0x1e0)](), this[_0x33199e(0x1ce)] = new _0x43cffc[(_0x33199e(0x1c3))](_0x33199e(0x1f9), ![], '\x70\x50\x68\x6f\x6e\x65\x4d\x65\x6e\x75'), this[_0x33199e(0x1ce)][_0x33199e(0x1d0)](this['\x5f\x6f\x6e\x44\x6f\x6e\x65\x42\x43\x6c\x69\x63\x6b']['\x62\x69\x6e\x64'](this)), this[_0x33199e(0x1ce)][_0x33199e(0x1ae)](0x0, _0x4850fd['\x68'] - _0x571509['\x68\x65\x69\x67\x68\x74']), this[_0x33199e(0x1ce)]['\x6f\x70\x61\x63\x69\x74\x79'] = 0x0, this['\x5f\x64\x6f\x6e\x65\x42\x75\x74\x74\x6f\x6e']['\x76\x69\x73\x69\x62\x6c\x65'] = ![], this[_0x33199e(0x1b9)](this[_0x33199e(0x1ce)]);
                    }
                }
            }
        }
    }, _0x1ea448['\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x43\x6c\x69\x63\x6b\x43\x6f\x6d\x6d\x6f\x6e'] = function (_0x2e5ecc, _0x4c8b0d) {
        var _0x72c7d3 = _0x2f713f;
        _0x72c7d3(0x1da) !== '\x61\x67\x4c\x56\x54' ? (this[_0x72c7d3(0x1f5)][this[_0x72c7d3(0x1b6)]] = _0x2e5ecc, this[_0x72c7d3(0x1f8)](), this[_0x72c7d3(0x1b2)](_0x4c8b0d), this[_0x72c7d3(0x1b5)]++, this[_0x72c7d3(0x1ad)]()) : this[_0x72c7d3(0x1b3)][_0x72c7d3(0x1ec)]();
    }, _0x1ea448[_0x2f713f(0x1ca)] = function () {
        var _0x5aa2b3 = _0x2f713f, _0x248e7f;
        try {
            if (this[_0x5aa2b3(0x1d6)] != null)
                return this[_0x5aa2b3(0x1d6)]();
        } catch (_0x1cebf9) {
            return _0x248e7f = _0x1cebf9, KDCore[_0x5aa2b3(0x1b8)](_0x248e7f);
        }
    }, _0x1ea448[_0x2f713f(0x1bf)] = function () {
        var _0x2d447a = _0x2f713f;
        if ('\x52\x6f\x4c\x77\x54' !== '\x52\x6f\x4c\x77\x54') {
            this[_0x2d447a(0x1c6)]();
            return;
        } else {
            var _0x589cd9, _0x1fa404;
            _0x589cd9 = ImageManager[_0x2d447a(0x1c9)](_0x2d447a(0x1d9)), _0x1fa404 = PKD_PhoneMenu[_0x2d447a(0x1c4)][_0x2d447a(0x1e0)](), this[_0x2d447a(0x1ce)] = new KDCore[(_0x2d447a(0x1c3))](_0x2d447a(0x1f9), ![], _0x2d447a(0x1ee)), this[_0x2d447a(0x1ce)]['\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72'](this[_0x2d447a(0x1ca)][_0x2d447a(0x1c7)](this)), this[_0x2d447a(0x1ce)][_0x2d447a(0x1ae)](0x0, _0x1fa404['\x68'] - _0x589cd9[_0x2d447a(0x1fa)]), this[_0x2d447a(0x1ce)][_0x2d447a(0x1cf)] = 0x0, this[_0x2d447a(0x1ce)][_0x2d447a(0x1eb)] = ![], this[_0x2d447a(0x1b9)](this['\x5f\x64\x6f\x6e\x65\x42\x75\x74\x74\x6f\x6e']);
        }
    };
}()));
function _0xa8a1() {
    var _0x482f7c = [
        '\x62\x74\x6e\x43\x68\x6f\x69\x63\x65\x5f\x30\x30',
        '\x5f\x62\x72\x61\x6e\x63\x68',
        '\x36\x31\x33\x34\x31\x46\x51\x66\x57\x51\x6e',
        '\x31\x36\x38\x38\x4d\x69\x6b\x47\x77\x77',
        '\x5f\x68\x69\x64\x65\x50\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65\x73',
        '\x62\x74\x6e\x44\x6f\x6e\x65',
        '\x68\x65\x69\x67\x68\x74',
        '\x6c\x65\x66\x74',
        '\x73\x75\x54\x65\x45',
        '\x53\x49\x58\x77\x59',
        '\x5f\x70\x72\x6f\x63\x65\x73\x73\x4e\x65\x78\x74\x4d\x65\x73\x73\x61\x67\x65',
        '\x6d\x6f\x76\x65',
        '\x5f\x73\x6c\x69\x64\x65\x4d\x65\x73\x73\x61\x67\x65\x55\x70',
        '\x36\x4f\x53\x76\x79\x42\x58',
        '\x31\x33\x32\x39\x36\x36\x30\x58\x6b\x78\x5a\x68\x65',
        '\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x46\x72\x6f\x6d\x50\x6c',
        '\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x41',
        '\x6d\x73\x67\x43\x6f\x6e\x74\x65\x6e\x74\x73',
        '\x6e\x65\x78\x74\x4d\x73\x67\x49\x6e\x64\x65\x78',
        '\x69\x6e\x64\x65\x6e\x74',
        '\x5f\x72\x65\x61\x6c\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x65\x69\x67\x68\x74',
        '\x77\x61\x72\x6e\x69\x6e\x67',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x5f\x76\x69\x73\x69\x62\x6c\x65\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x65\x69\x67\x68\x74',
        '\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x42\x43\x6c\x69\x63\x6b',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x41\x70\x45\x44\x4c',
        '\x77\x68\x65\x65\x6c\x59',
        '\x5f\x63\x72\x65\x61\x74\x65\x44\x6f\x6e\x65\x42\x75\x74\x74\x6f\x6e',
        '\x61\x70\x70\x65\x61\x72',
        '\x72\x69\x67\x68\x74',
        '\x53\x70\x72\x69\x74\x65\x5f\x55\x49\x54\x65\x78\x74',
        '\x42\x75\x74\x74\x6f\x6e\x4d',
        '\x55\x74\x69\x6c\x73',
        '\x5f\x70\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65',
        '\x5f\x73\x6c\x69\x64\x65\x4d\x65\x73\x73\x61\x67\x65\x44\x6f\x77\x6e',
        '\x62\x69\x6e\x64',
        '\x4a\x5a\x4e\x64\x6d',
        '\x6c\x6f\x61\x64\x50\x69\x63\x74\x75\x72\x65\x46\x6f\x72\x50\x68\x6f\x6e\x65',
        '\x5f\x6f\x6e\x44\x6f\x6e\x65\x42\x43\x6c\x69\x63\x6b',
        '\x5f\x63\x68\x6f\x69\x63\x65\x54\x65\x78\x74\x41',
        '\x5f\x68\x53\x69\x6e\x67\x6c\x65\x4d\x73\x67',
        '\x5f\x73\x68\x6f\x77\x50\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65',
        '\x5f\x64\x6f\x6e\x65\x42\x75\x74\x74\x6f\x6e',
        '\x6f\x70\x61\x63\x69\x74\x79',
        '\x61\x64\x64\x43\x6c\x69\x63\x6b\x48\x61\x6e\x64\x6c\x65\x72',
        '\x31\x36\x37\x31\x31\x33\x36\x45\x75\x6a\x44\x75\x51',
        '\x72\x52\x53\x63\x4e',
        '\x5f\x63\x68\x6f\x69\x63\x65\x49\x73\x43\x72\x65\x61\x74\x65\x64',
        '\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x43\x6c\x69\x63\x6b\x43\x6f\x6d\x6d\x6f\x6e',
        '\x5f\x73\x6c\x69\x64\x65\x4d\x65\x73\x73\x61\x67\x65',
        '\x62\x61\x63\x6b\x43\x61\x6c\x6c\x62\x61\x63\x6b',
        '\x61\x6e\x79',
        '\x34\x32\x33\x33\x32\x33\x69\x4e\x42\x74\x65\x43',
        '\x62\x74\x6e\x44\x6f\x6e\x65\x5f\x30\x30',
        '\x49\x64\x6d\x50\x6b',
        '\x6a\x6a\x57\x67\x75',
        '\x4f\x6b\x43\x42\x5a',
        '\x33\x39\x30\x38\x37\x51\x46\x69\x64\x48\x73',
        '\x75\x68\x68\x53\x61',
        '\x62\x74\x6e\x43\x68\x6f\x69\x63\x65',
        '\x73\x63\x72\x65\x65\x6e\x53\x69\x7a\x65',
        '\x35\x39\x32\x37\x38\x35\x79\x76\x51\x58\x61\x70',
        '\x4c\x54\x4b\x5a\x57',
        '\x77\x69\x64\x74\x68',
        '\x69\x73\x54\x72\x69\x67\x67\x65\x72\x65\x64',
        '\x5f\x63\x68\x6f\x69\x63\x65\x42\x75\x74\x74\x6f\x6e\x42',
        '\x70\x61\x72\x61\x6d\x65\x74\x65\x72\x73',
        '\x34\x37\x34\x39\x35\x32\x44\x43\x74\x4c\x77\x79',
        '\x5f\x6f\x6e\x43\x68\x6f\x69\x63\x65\x41\x43\x6c\x69\x63\x6b',
        '\x4c\x48\x7a\x4f\x54',
        '\x5f\x69\x73\x57\x61\x69\x74\x50\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65',
        '\x76\x69\x73\x69\x62\x6c\x65',
        '\x64\x69\x73\x61\x62\x6c\x65',
        '\x65\x6e\x61\x62\x6c\x65',
        '\x70\x50\x68\x6f\x6e\x65\x4d\x65\x6e\x75',
        '\x5f\x63\x72\x65\x61\x74\x65\x50\x6c\x61\x79\x65\x72\x43\x68\x6f\x69\x63\x65\x73',
        '\x63\x65\x6e\x74\x65\x72',
        '\x5f\x63\x68\x6f\x69\x63\x65\x54\x65\x78\x74\x42',
        '\x4d\x59\x76\x7a\x4a',
        '\x23\x30\x30\x30'
    ];
    _0xa8a1 = function () {
        return _0x482f7c;
    };
    return _0xa8a1();
}

function _0x1b01(_0x4eb50a, _0x3f6688) {
    var _0x1613da = _0x1613();
    return _0x1b01 = function (_0x1b013f, _0xeee20c) {
        _0x1b013f = _0x1b013f - 0x1a0;
        var _0x261f52 = _0x1613da[_0x1b013f];
        return _0x261f52;
    }, _0x1b01(_0x4eb50a, _0x3f6688);
}
function _0x1613() {
    var _0x1ab615 = [
        '\x5f\x68\x69\x73\x74\x6f\x72\x79\x44\x61\x74\x61',
        '\x34\x76\x55\x62\x6e\x78\x56',
        '\x64\x72\x61\x77\x54\x65\x78\x74\x46\x75\x6c\x6c',
        '\x70\x6c\x61\x79\x43\x75\x72\x73\x6f\x72',
        '\x6d\x73\x67\x43\x6f\x6e\x74\x65\x6e\x74\x73',
        '\x55\x74\x69\x6c\x73',
        '\x36\x34\x32\x38\x35\x38\x54\x79\x52\x47\x54\x52',
        '\x52\x74\x6a\x6f\x46',
        '\x72\x69\x67\x68\x74',
        '\x75\x4f\x69\x6e\x50',
        '\x5f\x69\x73\x49\x6e\x74\x65\x72\x61\x63\x74\x69\x76\x65\x48\x69\x73\x74\x6f\x72\x79\x4d\x6f\x64\x65',
        '\x6c\x65\x66\x74',
        '\x43\x53\x53',
        '\x5f\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67',
        '\x71\x4f\x51\x58\x59',
        '\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x46\x72\x6f\x6d\x50\x6c',
        '\x33\x35\x64\x58\x6e\x50\x6e\x55',
        '\x31\x31\x37\x79\x45\x70\x4a\x51\x70',
        '\x79\x71\x73\x58\x68',
        '\x31\x32\x38\x33\x38\x32\x33\x39\x46\x6b\x62\x78\x41\x6c',
        '\x73\x63\x72\x65\x65\x6e\x53\x69\x7a\x65',
        '\x34\x34\x30\x35\x34\x33\x66\x6a\x44\x6c\x45\x45',
        '\x53\x70\x72\x69\x74\x65',
        '\x70\x72\x6f\x74\x6f\x74\x79\x70\x65',
        '\x5f\x64\x72\x61\x77\x48\x69\x73\x74\x6f\x72\x79\x4d\x65\x73\x73\x61\x67\x65\x73',
        '\x61\x70\x70\x65\x61\x72',
        '\x61\x64\x64\x43\x68\x69\x6c\x64',
        '\x32\x34\x30\x33\x37\x38\x30\x4e\x6a\x59\x72\x50\x48',
        '\x5f\x72\x65\x61\x6c\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x65\x69\x67\x68\x74',
        '\x5f\x76\x69\x73\x69\x62\x6c\x65\x4d\x65\x73\x73\x61\x67\x65\x73\x48\x65\x69\x67\x68\x74',
        '\x68\x6a\x54\x49\x68',
        '\x62\x69\x74\x6d\x61\x70',
        '\x36\x43\x6e\x48\x4a\x4f\x5a',
        '\x5f\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x43\x6f\x6d\x6d\x6f\x6e',
        '\x43\x6f\x6c\x6f\x72',
        '\x36\x33\x30\x6f\x43\x71\x43\x78\x42',
        '\x45\x63\x77\x4d\x79',
        '\x5f\x63\x61\x6e\x53\x6c\x69\x64\x65\x4d\x65\x73\x73\x61\x67\x65',
        '\x72\x65\x41\x6c\x70\x68\x61',
        '\x5f\x69\x73\x48\x69\x73\x74\x6f\x72\x79\x4d\x6f\x64\x65',
        '\x66\x69\x6c\x6c\x52\x65\x63\x74',
        '\x35\x33\x35\x32\x37\x31\x35\x53\x59\x59\x4b\x42\x6b',
        '\x33\x32\x32\x35\x35\x36\x31\x45\x51\x42\x78\x64\x48',
        '\x70\x4e\x73\x5a\x58',
        '\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72',
        '\x7a\x4a\x45\x53\x70',
        '\x5f\x68\x53\x69\x6e\x67\x6c\x65\x4d\x73\x67',
        '\x6e\x65\x78\x74\x4d\x73\x67\x49\x6e\x64\x65\x78',
        '\x5f\x68\x69\x73\x74\x6f\x72\x79\x44\x61\x74\x61\x42\x65\x66\x6f\x72\x65',
        '\x5f\x6d\x6f\x76\x65\x4d\x65\x73\x73\x61\x67\x65\x73',
        '\x67\x64\x5a\x59\x59',
        '\x66\x6f\x6e\x74\x53\x69\x7a\x65',
        '\x32\x35\x34\x38\x34\x38\x66\x7a\x66\x74\x56\x48',
        '\x38\x4a\x74\x44\x67\x69\x71',
        '\x70\x75\x73\x68'
    ];
    _0x1613 = function () {
        return _0x1ab615;
    };
    return _0x1613();
}
(function (_0x29b620, _0x4a2a39) {
    var _0x5aa446 = _0x1b01, _0xaeec8d = _0x29b620();
    while (!![]) {
        try {
            var _0x3436c7 = -parseInt(_0x5aa446(0x1b8)) / 0x1 * (-parseInt(_0x5aa446(0x1c3)) / 0x2) + -parseInt(_0x5aa446(0x1cd)) / 0x3 + -parseInt(_0x5aa446(0x1a4)) / 0x4 * (-parseInt(_0x5aa446(0x1cc)) / 0x5) + parseInt(_0x5aa446(0x1a9)) / 0x6 * (parseInt(_0x5aa446(0x1b3)) / 0x7) + -parseInt(_0x5aa446(0x1a1)) / 0x8 * (parseInt(_0x5aa446(0x1b6)) / 0x9) + -parseInt(_0x5aa446(0x1c6)) / 0xa * (parseInt(_0x5aa446(0x1a0)) / 0xb) + -parseInt(_0x5aa446(0x1be)) / 0xc * (-parseInt(_0x5aa446(0x1b4)) / 0xd);
            if (_0x3436c7 === _0x4a2a39)
                break;
            else
                _0xaeec8d['push'](_0xaeec8d['shift']());
        } catch (_0x5ad4a0) {
            _0xaeec8d['push'](_0xaeec8d['shift']());
        }
    }
}(_0x1613, 0xbbdc8), (function () {
    var _0x3755f0 = _0x1b01, _0xc0846a;
    _0xc0846a = PKD_SpriteMessageScreen[_0x3755f0(0x1ba)], _0xc0846a[_0x3755f0(0x1b0)] = function (_0x6c3e91) {
        var _0x431b92 = _0x3755f0;
        if ('\x67\x64\x5a\x59\x59' === _0x431b92(0x1d5))
            return SoundManager[_0x431b92(0x1a6)](), this[_0x431b92(0x1c4)](_0x6c3e91, ![]);
        else
            this[_0x431b92(0x1a3)]['\x70\x75\x73\x68']([
                _0x40353e,
                _0x431b92(0x1ab)
            ]);
    }, _0xc0846a[_0x3755f0(0x1b2)] = function (_0xcd2287) {
        var _0x39c83d = _0x3755f0;
        if (_0x39c83d(0x1ce) === _0x39c83d(0x1c1))
            _0x5c5819[_0x39c83d(0x1c2)][_0x39c83d(0x1cf)] = _0xb5cd86[_0x39c83d(0x1c5)]['\x47\x52\x45\x45\x4e'][_0x39c83d(0x1af)], _0x10bf36['\x62\x69\x74\x6d\x61\x70']['\x66\x6f\x6e\x74\x53\x69\x7a\x65'] = 0xe, _0x2de80f[_0x39c83d(0x1c2)][_0x39c83d(0x1a5)](_0x265795, _0x39c83d(0x1ab)), this[_0x39c83d(0x1ca)] === ![] && this[_0x39c83d(0x1a3)][_0x39c83d(0x1a2)]([
                _0x44a2e2,
                _0x39c83d(0x1ab)
            ]);
        else
            return this[_0x39c83d(0x1c4)](_0xcd2287, !![]);
    }, _0xc0846a[_0x3755f0(0x1bb)] = function () {
        var _0x4cc7dd = _0x3755f0, _0x435f83, _0x477c7c, _0x1252be, _0x28d951;
        this[_0x4cc7dd(0x1d2)] = 0x0, _0x435f83 = this[_0x4cc7dd(0x1a3)];
        this['\x5f\x69\x73\x49\x6e\x74\x65\x72\x61\x63\x74\x69\x76\x65\x48\x69\x73\x74\x6f\x72\x79\x4d\x6f\x64\x65'] === !![] && (_0x435f83 = this[_0x4cc7dd(0x1d3)]);
        for (_0x1252be = 0x0, _0x28d951 = _0x435f83['\x6c\x65\x6e\x67\x74\x68']; _0x1252be < _0x28d951; _0x1252be++) {
            _0x4cc7dd(0x1c7) === _0x4cc7dd(0x1ac) ? _0x20f36e = this[_0x4cc7dd(0x1d3)] : (_0x477c7c = _0x435f83[_0x1252be], _0x477c7c[0x1] === '\x6c\x65\x66\x74' ? this[_0x4cc7dd(0x1c4)](_0x477c7c[0x0], ![]) : '\x4a\x58\x71\x58\x6b' === '\x4a\x58\x71\x58\x6b' ? this['\x5f\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x43\x6f\x6d\x6d\x6f\x6e'](_0x477c7c[0x0], !![]) : this[_0x4cc7dd(0x1a3)][_0x4cc7dd(0x1a2)]([
                _0x591381,
                _0x4cc7dd(0x1ae)
            ]), this[_0x4cc7dd(0x1d2)]++);
        }
        this[_0x4cc7dd(0x1ad)] === ![] && this['\x66\x69\x6e\x69\x73\x68']();
    }, _0xc0846a['\x5f\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x43\x6f\x6d\x6d\x6f\x6e'] = function (_0x26d737, _0x4ca10c = ![]) {
        var _0x293787 = _0x3755f0;
        if (_0x293787(0x1d0) === '\x6f\x4d\x69\x49\x4c')
            return _0x4a8590[_0x293787(0x1a6)](), this[_0x293787(0x1c4)](_0x4d2150, ![]);
        else {
            var _0x400f5d, _0xf39d86, _0x18ec3f;
            return _0x18ec3f = PKD_PhoneMenu[_0x293787(0x1a8)][_0x293787(0x1b7)]()['\x77'] - 0xc, _0xf39d86 = new KDCore[(_0x293787(0x1b9))](new Bitmap(_0x18ec3f, this[_0x293787(0x1d1)])), _0x400f5d = new Sprite(new Bitmap(_0x18ec3f, this[_0x293787(0x1d1)])), _0x4ca10c === !![] ? _0x293787(0x1b5) !== _0x293787(0x1b5) ? (_0x27c3fe = _0x43a58d[_0x2cfbe0], _0x379ab3[0x1] === '\x6c\x65\x66\x74' ? this['\x5f\x64\x72\x61\x77\x43\x68\x61\x74\x4d\x73\x67\x43\x6f\x6d\x6d\x6f\x6e'](_0x56dfc4[0x0], ![]) : this[_0x293787(0x1c4)](_0x3a89fd[0x0], !![]), this[_0x293787(0x1d2)]++) : (_0x400f5d['\x62\x69\x74\x6d\x61\x70']['\x74\x65\x78\x74\x43\x6f\x6c\x6f\x72'] = KDCore[_0x293787(0x1c5)]['\x47\x52\x45\x45\x4e'][_0x293787(0x1af)], _0x400f5d[_0x293787(0x1c2)]['\x66\x6f\x6e\x74\x53\x69\x7a\x65'] = 0xe, _0x400f5d['\x62\x69\x74\x6d\x61\x70']['\x64\x72\x61\x77\x54\x65\x78\x74\x46\x75\x6c\x6c'](_0x26d737, '\x72\x69\x67\x68\x74'), this['\x5f\x69\x73\x48\x69\x73\x74\x6f\x72\x79\x4d\x6f\x64\x65'] === ![] && this[_0x293787(0x1a3)][_0x293787(0x1a2)]([
                _0x26d737,
                '\x72\x69\x67\x68\x74'
            ])) : (_0x400f5d['\x62\x69\x74\x6d\x61\x70'][_0x293787(0x1d6)] = 0xc, _0x400f5d[_0x293787(0x1c2)]['\x64\x72\x61\x77\x54\x65\x78\x74\x46\x75\x6c\x6c'](_0x26d737, _0x293787(0x1ae)), this[_0x293787(0x1ca)] === ![] && this['\x5f\x68\x69\x73\x74\x6f\x72\x79\x44\x61\x74\x61'][_0x293787(0x1a2)]([
                _0x26d737,
                _0x293787(0x1ae)
            ])), _0xf39d86['\x79'] = this[_0x293787(0x1d2)] * (this[_0x293787(0x1d1)] + 0x4), _0x18ec3f = _0x400f5d['\x62\x69\x74\x6d\x61\x70']['\x6d\x65\x61\x73\x75\x72\x65\x54\x65\x78\x74\x57\x69\x64\x74\x68'](_0x26d737) + 0xa, _0x400f5d['\x78'] = 0x5, _0xf39d86[_0x293787(0x1bd)](_0x400f5d), _0x4ca10c === ![] && _0xf39d86[_0x293787(0x1c2)][_0x293787(0x1cb)](0x0, 0x0, _0x18ec3f, this[_0x293787(0x1d1)], KDCore[_0x293787(0x1c5)]['\x42\x4c\x41\x43\x4b'][_0x293787(0x1c9)](0xb4)[_0x293787(0x1af)]), this[_0x293787(0x1a7)]['\x61\x64\x64\x43\x68\x69\x6c\x64'](_0xf39d86), _0xf39d86[_0x293787(0x1bc)](0x2d), this[_0x293787(0x1bf)] += this['\x5f\x68\x53\x69\x6e\x67\x6c\x65\x4d\x73\x67'], this[_0x293787(0x1d4)]();
        }
    }, _0xc0846a[_0x3755f0(0x1d4)] = function () {
        var _0xbd1c3c = _0x3755f0, _0x31ef3b;
        this[_0xbd1c3c(0x1bf)] + this[_0xbd1c3c(0x1d1)] >= this[_0xbd1c3c(0x1c0)] && (_0xbd1c3c(0x1b1) === _0xbd1c3c(0x1aa) ? this[_0xbd1c3c(0x1c4)](_0x4fb20c[0x0], ![]) : (this[_0xbd1c3c(0x1c8)] = !![], _0x31ef3b = this[_0xbd1c3c(0x1bf)] - this[_0xbd1c3c(0x1c0)], this[_0xbd1c3c(0x1a7)]['\x79'] = -_0x31ef3b));
    };
}()));

// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppItem;

PKD_SpritePhoneAppItem = class PKD_SpritePhoneAppItem extends KDCore.UI.Sprite_UIElement {
  constructor(params) {
    super(params);
    this._isManualHoveredState = false;
    this._isBeenUnderMouse = false;
    this._changer = null;
    this._clickChanger = null;
    this._scaleFactor = this.initialScale();
    this.scale.set(this._scaleFactor);
    this._canExecute = false;
    return;
  }

  update() {
    var ref;
    super.update();
    this._updateHoverUnHoverAnimation();
    if ((ref = this._clickChanger) != null) {
      ref.update();
    }
  }

  initialScale() {
    return 0.85;
  }

  topScale() {
    return 1.0;
  }

  setTextField(textField) {
    this.textField = textField;
  }

  refresh() {
    var e;
    if (this._alertIcon == null) {
      return;
    }
    try {
      return this._alertIcon.visible = $gameSwitches.value(this.params.alertSwitchId);
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

  //$[OVER]
  isActive() {
    return true;
  }

  isCanExecuteAction() {
    return this._canExecute === true;
  }

  requestActionExecution() {
    if (this._isDisabled === true) {
      return;
    }
    this.playClickEffect();
  }

  getActionForExecution() {
    return {
      ev: this.params.commonEventId,
      isOuter: this.params.isOuterStart
    };
  }

  onActionExecuted() {
    this._canExecute = false;
    // * Если приложение было запущенно, сбросить переключатель
    if (this.params.alertSwitchId > 0) {
      $gameSwitches.setValue(this.params.alertSwitchId, false);
    }
  }

  //$[OVER]
  rootImageFolder() {
    return "pPhoneMenu";
  }

  alignWithSlot() {
    if (this.parent == null) {
      return;
    }
    this.x = this.parent.width / 2;
    return this.y = this.parent.height / 2;
  }

  //$[OVER]
  _resetPosition() {
    var ref;
    this.x = this.y = 0;
    this.anchor.set(0.5);
    if ((ref = this.zeroChild()) != null) {
      ref.anchor.set(0.5);
    }
  }

  setManualHoveredState() {
    this._isManualSelectedItem = false;
    this._isManualSelectionMode = true;
    this._startAnimateOut();
  }

  resetManualHoveredState() {
    this._isManualSelectedItem = false;
    this._isManualSelectionMode = false;
    this._startAnimateOut();
  }

  isManualSelected() {
    return this._isManualSelectedItem === true;
  }

  manualSelect() {
    this._startAnimateIn();
    this._isManualSelectedItem = true;
  }

  isSelected() {
    return this.isUnderMouse() || this.isManualSelected();
  }

  disableApp() {
    this._isDisabled = true;
    return this.desaturate();
  }

  playClickEffect() {
    var fromY, toY;
    this._clickChanger = new KDCore.Changer(this._appButton);
    this._clickChanger.change('y');
    this._appButton.y = 0;
    fromY = 0;
    toY = 6;
    this._clickChanger.from(fromY).to(toY).step(3).repeat(3).reverse().done(() => {
      this._appButton.y = 0;
      this._canExecute = true;
      return this._clickChanger = null;
    });
    this._clickChanger.start();
  }

  resetAllAnimations() {
    this._changer = null;
    this._clickChanger = null;
    this._appButton.y = 0;
    this.scale.set(this.initialScale());
  }

  _updateHoverUnHoverAnimation() {
    var ref;
    if ((ref = this._changer) != null) {
      ref.update();
    }
    this._updateScaleFactor();
    if (this._isManualSelectionMode === true) {
      return;
    }
    if (this.isUnderMouse()) {
      if (this._isBeenUnderMouse === false) {
        this._isBeenUnderMouse = true;
        this._startAnimateIn();
      }
    } else {
      if (this._isBeenUnderMouse === true) {
        this._startAnimateOut();
        this._isBeenUnderMouse = false;
      }
    }
  }

  _updateScaleFactor() {
    if (this._changer == null) {
      return;
    }
    return this.scale.set(this._scaleFactor);
  }

  _startAnimateIn() {
    var curValue, finalValue;
    // * No moveIn if started!
    if (this._clickChanger != null) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    curValue = this._scaleFactor;
    finalValue = this.topScale();
    this._changer.change('_scaleFactor').from(curValue).to(finalValue).step(0.05);
    this._changer.start();
    this._changer.done(() => {
      this._scaleFactor = this.topScale();
      this._updateScaleFactor();
      return this._changer = null;
    });
    setTimeout((() => {
      var ref;
      return (ref = this.textField) != null ? ref.draw(this.params.name) : void 0;
    }), 100);
  }

  _startAnimateOut() {
    var curValue, finalValue, ref;
    // * No moveOut if started!
    if (this._clickChanger != null) {
      return;
    }
    this._changer = new KDCore.Changer(this);
    curValue = this._scaleFactor;
    finalValue = this.initialScale();
    this._changer.change('_scaleFactor').from(curValue).to(finalValue).step(0.1);
    this._changer.start();
    this._changer.done(() => {
      this._scaleFactor = this.initialScale();
      this._updateScaleFactor();
      return this._changer = null;
    });
    if ((ref = this.textField) != null) {
      ref.draw("");
    }
  }

  _prepare() {
    super._prepare();
    return this.visible = true; // * always
  }

  _createContent() {
    this._createButton();
    this._createAlertIcon();
    return this._resetPosition();
  }

  _createButton() {
    var imageName;
    imageName = this.params.icon;
    this._appButton = new KDCore.ButtonMU({
      main: imageName,
      hover: imageName,
      disabled: imageName
    }, false, this.rootImageFolder());
    this._appButton.addClickHandler(() => {
      return this.requestActionExecution();
    });
    return this.add(this._appButton);
  }

  _createAlertIcon() {
    var e;
    try {
      if (this.params.alertSwitchId <= 0) {
        return;
      }
      this._alertIcon = new KDCore.Sprite(ImageManager.loadPictureForPhone("AppIcon_Alert"));
      this._alertIcon.anchor.set(0.5);
      this._appButton.addChild(this._alertIcon);
      return this.refresh();
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneAppMessagesContext;

PKD_SpritePhoneAppMessagesContext = class PKD_SpritePhoneAppMessagesContext extends PKD_SpritePhoneAppContext {
  constructor() {
    super();
    this._inMessage = false;
  }

  _loadAppData() {
    return PKD_PhoneMenu.Utils.GetAppData("messagesApp");
  }

  _defaultAppBackgroundBitmap() {
    return ImageManager.loadPictureForPhone("messagesBackground");
  }

  _createContent() {
    this._createMessagesList();
  }

  backHandler(phone) {
    PKD_PhoneMenu.Utils.refreshMessagesAppAlert();
    if (!this._inMessage) {
      return super.backHandler(phone);
    } else {
      return this._backFromMessageScreen();
    }
  }

  _createMessagesList() {
    var r;
    r = this._getPMLRect();
    if (KDCore.isMZ()) {
      this._messages = new PKD_Window_PhoneMessagesList(r);
    } else {
      this._messages = new PKD_Window_PhoneMessagesList(r.x, r.y, r.width, r.height);
    }
    this._messages.setHandler('ok', this._onMsgSelected.bind(this));
    this._messages.hide();
    this.addChild(this._messages);
  }

  _onMsgSelected() {
    this._messages.hide();
    this._inMessage = true;
    this._createMessageScreen(this._messages.selectedMessage());
  }

  _createMessageScreen(msgData) {
    this._messageScreen = new PKD_SpriteMessageScreen(msgData);
    this._messageScreen.backCallback = this._backFromMessageScreen.bind(this);
    this.addChild(this._messageScreen);
  }

  _backFromMessageScreen() {
    if (this._messageScreen.isEnded()) {
      this._messageScreen.end();
      this.removeChild(this._messageScreen);
      this._inMessage = false;
      return this.showContent();
    } else {
      return SoundManager.playBuzzer();
    }
  }

  _getPMLRect() {
    var h, w;
    ({w, h} = this.screenSize());
    return {
      x: 0,
      y: 0,
      width: w,
      height: h
    };
  }

  showContent() {
    PKD_PhoneMenu.Utils.SetPhoneTopText(this._appData.name);
    this._messages.refresh();
    this._messages.safeSelect();
    this._messages.activate();
    return this._messages.show();
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_SpritePhoneIcon;

PKD_SpritePhoneIcon = class PKD_SpritePhoneIcon extends KDCore.Sprite {
  constructor() {
    super();
    this._create();
    this.opacity = 0;
    this.refreshAlertSymbol();
    this.appear(50, 10);
    return;
  }

  refreshAlertSymbol() {
    var ref;
    return (ref = this._alertIcon) != null ? ref.visible = PKD_PhoneMenu.IsHaveNewMessages() : void 0;
  }

  _create() {
    var e, mapIconPosition;
    ({mapIconPosition} = PKD_PhoneMenu.PP.getPhoneSettings());
    this._createPhoneButton();
    this._createAlertIcon();
    try {
      this.move(mapIconPosition);
    } catch (error) {
      e = error;
      KDCore.warning(e);
      this.move(0, 0);
    }
  }

  _createPhoneButton() {
    this._button = new KDCore.ButtonM("PhoneIcon", false, "pPhoneMenu");
    this._button.addClickHandler(() => {
      if (this.opacity === 255 && this.visible === true) {
        return PKD_PhoneMenu.Show();
      }
    });
    return this.addChild(this._button);
  }

  _createAlertIcon() {
    this._alertIcon = new Sprite(ImageManager.loadPictureForPhone("PhoneIcon_Alert"));
    return this.addChild(this._alertIcon);
  }

};


// Generated by CoffeeScript 2.6.1
var PKD_Window_PhoneMessagesList;

PKD_Window_PhoneMessagesList = class PKD_Window_PhoneMessagesList extends Window_Selectable {
  constructor() {
    super(...arguments);
    this.setBackgroundType(2);
    this.refresh();
  }

  maxItems() {
    return $gameSystem.pkdGetPhoneMessagesList().length;
  }

  itemHeight() {
    return 56;
  }

  safeSelect() {
    if (this.maxItems() > 0) {
      return this.select(0);
    } else {
      return this.select(-1);
    }
  }

  selectedMessage() {
    return this.getMessageData(this.index());
  }

  drawItem(index) {
    var d, e, rect;
    rect = this.itemRect(index);
    d = this.getMessageData(index);
    if (d == null) {
      return;
    }
    try {
      this._drawIcon(rect, $gameSystem.pkdIsNewMessageFrom(d.name));
      this._drawFace(d.avatar, rect);
      return this._drawName(d.name, rect);
    } catch (error) {
      //@_drawLineRect(rect.x, rect.y, rect.width, rect.hight) unless index == 0
      e = error;
      return KDCore.warning(e);
    }
  }

  _drawIcon(rect, isNew) {
    var backBit;
    if (isNew) {
      backBit = ImageManager.loadPictureForPhone('MessageIconNew');
    } else {
      backBit = ImageManager.loadPictureForPhone('MessageIcon');
    }
    this.contents.drawOnMe(backBit, rect.width - backBit.width, rect.y);
  }

  _drawFace(name, rect) {
    var faceBit;
    faceBit = ImageManager.loadPictureForPhone(name);
    faceBit.addLoadListener(() => {
      return this.contents.blt(faceBit, 0, 0, 48, 48, rect.x, rect.y + 2);
    });
  }

  _drawName(name, rect) {
    this.contents.fontSize = 18;
    return this.drawText(name, rect.x + 60, rect.y + 6);
  }

  //@resetFontSettings()

    //_drawLineRect: (x, y, w, h) ->
  //    c = KDCore.Color.BLACK.reAlpha(60).CSS
  //    @contents.fillRect(x, y, w, 1, c)
  getMessageData(index) {
    var allMsg;
    allMsg = $gameSystem.pkdGetPhoneMessagesList();
    return allMsg[index];
  }

};


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Boot.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__start, _;
  //@[DEFINES]
  _ = Scene_Boot.prototype;
  //@[ALIAS]
  ALIAS__start = _.start;
  _.start = function() {
    ALIAS__start.call(this, ...arguments);
    PKD_PhoneMenu.LoadPluginSettings();
  };
})();

// ■ END Scene_Boot.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var ALIAS__onMapLoaded, _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  //@[ALIAS]
  ALIAS__onMapLoaded = _.onMapLoaded;
  _.onMapLoaded = function() {
    $gameSystem.pkdPreparePhoneImages();
    ALIAS__onMapLoaded.call(this, ...arguments);
    PKD_PhoneMenu.Map.Show();
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------


// Generated by CoffeeScript 2.6.1
//╒═════════════════════════════════════════════════════════════════════════╛
// ■ Scene_Map.coffee
//╒═════════════════════════════════════════════════════════════════════════╛
//---------------------------------------------------------------------------
(function() {
  var _;
  //@[DEFINES]
  _ = Scene_Map.prototype;
  _.pkdRefreshPhoneIcon = function() {
    var e, ref;
    try {
      return (ref = this._pkdPhoneIcon) != null ? ref.refreshAlertSymbol() : void 0;
    } catch (error) {
      e = error;
      return KDCore.warning(e);
    }
  };
  _.pkdShowPhoneIcon = function() {
    var ref;
    if (this._pkdPhoneIcon == null) {
      this._pkdPhoneIcon = new PKD_SpritePhoneIcon();
      this.addChild(this._pkdPhoneIcon);
    }
    if ((ref = this._pkdPhoneIcon) != null) {
      ref.visible = true;
    }
  };
  _.pkdHidePhoneIcon = function() {
    if (this._pkdPhoneIcon == null) {
      return;
    }
    this._pkdPhoneIcon.visible = false;
  };
})();

// ■ END Scene_Map.coffee
//---------------------------------------------------------------------------

//Plugin PKD_PhoneMenu builded by PKD PluginBuilder 2.2 - 22.02.2023