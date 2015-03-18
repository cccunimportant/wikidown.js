## Enigma 密碼機的運作原理

### 簡介

![圖、Enigma 密碼機](Four-rotor-enigma.jpg)

Enigma 密碼機是德軍在二次大戰時期所採用的加解密機器，這台密碼機曾經是希特勒口中無法破解的機器，但是在戰爭的後期，德軍的密碼幾乎都被英國破解了，因此後來很多關鍵性的戰役都因為機密被英軍知道而導致戰情逆轉，因此二次大戰除了是強大武器的戰爭之外，也是一個密碼學的戰爭。

![圖、Enigma 的旋轉輪](640px-Enigma-rotor-stack.jpg)

![圖、Enigma 的接線板](640px-Enigma-plugboard.jpg)

### 觀看影片

對於想要瞭解 Enigma 密碼機的運作原理的人，強烈建議先看完下列文章以及其中的兩個影片後，在繼續閱讀我們的解說，這樣您才會有一個清楚的概念。

* [究竟圖靈是怎樣破解德軍的密碼系統 Enigma？](http://www.inside.com.tw/2015/03/03/how-did-alan-turing-figure-out-the-enigma-machine)
 * [YouTube: 158,962,555,217,826,360,000 (Enigma Machine) - Numberphile](https://www.youtube.com/watch?v=G2_Q9FoD-oQ)
 * [YouTube: Flaw in the Enigma Code - Numberphile](https://www.youtube.com/watch?v=V4V2bpZlqx8)

從上面影片中您可以看到，同樣一個字母透過 Enigma 會編成不同的字母。舉例而言， Y 可能這一次編為 Ｗ，下一次又邊為 Ｔ。而且兩個不同的字母，像是 Ｐ和 Ｚ，也有可能都被編成 S。

Enigma 之所以會有這樣的編碼行為，是因為最右邊的旋轉輪在每打一個字之後就會旋轉一格，然後前面的輪子在某個時候又會帶動後面的輪子，這些旋轉輪的不同狀態讓同一個字母會被編成不同的碼。

### 運作原理圖

以下這張是 Enigma 密碼機的原理圖，該圖顯示了按下A鍵後機器是如何將它顯示成D鍵的（燈D發亮），而按下D鍵的同時燈A也會發亮，因為此時 Enigma 的轉輪與接線板在 D 和 Ａ之間建立了一條電路通道。

![圖、Enigma 的運作原理](Enigma_wiring_kleur.svg.png)

為了使讀者更容易理解，上圖只顯示4個鍵和4個燈。實際上，Enigma 密碼機擁有顯示燈、按鍵、插孔和線路各26個。電流首先從電池①流到雙向開關②，再流到接線板③。接線板的作用是將鍵盤②與固定介面④連接起來。接下來，電流會流到固定介面④，然後流經3個（德國防衛軍版）或4個（德國海軍M4版和德國國防軍情報局版）旋轉盤⑤，之後進入反射器⑥。反射器將電流從另一條線路向反方嚮導出，電流會再一次通過旋轉盤⑤和固定介面④，之後到達插孔S，又通過一條電線⑧流到插孔D，最後通過另一個雙向開關⑨去點亮顯示燈。

下圖顯示了簡化後的電流圖，連續按兩次A鍵後，電流會流經所有旋轉盤，通過反射器後分別向反方向流到G燈和C燈。 注意：旋轉盤上的灰色線條代表了其它可能的線路，這些線條與旋轉盤以硬接連方式連接起來。 連續按兩次A鍵會得到不同的結果，第一次得到的是G，第二次是C。這是因為最右邊的旋轉盤在第一次按下A鍵後會旋轉一點點，這就將A鍵發出的電流送到了一個完全不同的路線上。

![圖、Enigma 的運作原理](633px-Enigma-action.svg.png)

Enigma  對每個字母的加密過程可以以數學的角度看作為一個組合過程。假設我們有一台德國陸軍/空軍版3旋轉盤 Enigma 密碼機，讓P表示接線板的連線，U表示反射器，L、M、R表示左、中、右旋轉盤。那麼加密後的訊息 E 就可以表示成如下公式。

![](EnigmaMath.png)

### 操作過程

德軍密碼機的操作者每天都會收到一份密碼本，然後根據密碼本來設置 Enigma  的旋轉盤與接線板，以下是英軍從 U-505 號潛艇上繳獲的一本密碼本，或許您可以從中看出德軍是如何設置機器的。

![圖、Enigma 的密碼本](1024px-Kenngruppenheft.jpg)

為了使一條訊息能夠正確地被加密及解密，發送訊息與接收訊息的 Enigma  密碼機的設置必須相同；旋轉盤必須一模一樣，而且它們的排列順序，起始位置和接線板的連線也必須相同 （在末期版本中由於反射器也可設定，因此反射器的線路也必須相同）。所有這些設置都需要在使用之前確定下來，並且會被記錄在密碼本中。

另外、在每條訊息發送時，操作員都會透過「指示器步驟」設定一組「旋轉盤起始位置」，這個「指示器步驟」是為了防止敵軍透過大量文本的「頻率分析」進行密碼破解而設立的。

### 該如何破解呢？

若要破解德軍的密碼，就得要將上述的這些未知資訊都搜集到，換言之、也就是要取得那份密碼本。

問題是、密碼本每天都更換一次，即使英軍取得了當天的密碼本，也只能用一天，隔天該密碼本就作廢了，於是整個破解程序又得重新來過！

但是、任何保密程序的關鍵都必須要人與裝置的完美配合，即使在電腦發達的今天，如果你的密碼總是設定成很容易記的數字、生日、身分證字號或電話號碼，那麼破解程式就很容易找到突破口，進而破解並入侵你的電腦。

即使你的密碼設得很難又很長，但你也很難保證電腦的軟體沒有漏洞，而那些駭客正是利用這些漏洞或後門來取得你電腦中的資料，並植入後門以便為所欲為的。

言歸正傳，到底英軍是如何破解德軍密碼的呢？且讓我們賣個關子，請讀者繼續看下一篇文章！

### 參考文獻

* [恩尼格瑪密碼機](http://zh.wikipedia.org/wiki/%E6%81%A9%E5%B0%BC%E6%A0%BC%E7%8E%9B%E5%AF%86%E7%A0%81%E6%9C%BA) 
* [Wikipedia:Enigma machine](http://en.wikipedia.org/wiki/Enigma_machine)