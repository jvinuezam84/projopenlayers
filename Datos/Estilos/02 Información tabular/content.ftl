<ul>
<#list features as feature>
  <b>${feature.NOMDPTO.value}</b>: <br/>
  <a href="http://127.0.0.1:8080/pdf/${feature.IDDPTO.value}.pdf" target="_blank">
  <img src="http://127.0.0.1:8080/fotos/${feature.IDDPTO.value}.jpg" width="50%" height="50%"/></a><br/>
</#list>
</ul>