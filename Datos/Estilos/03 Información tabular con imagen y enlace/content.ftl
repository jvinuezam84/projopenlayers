<ul>
<#list features as feature>
  <b>${feature.DPTO.value}</b>: <br/>
  <a href="http://127.0.0.1:8080/pdf/${feature.COD_DEP.value}.pdf" target="_blank">
  <img src="http://127.0.0.1:8080/fotos/${feature.COD_DEP.value}.jpg" width="50%" height="50%"/></a><br/>
  POB. 1995: ${feature.P1995.value}
</#list>
</ul>