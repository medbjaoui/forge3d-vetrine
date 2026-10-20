#!/usr/bin/env python3
"""Read-only route/security checks, plus cleanup of one named synthetic browser-test lead."""
import json,pathlib,urllib.request,urllib.error
base="http://127.0.0.1:3282"
class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self,*args,**kwargs):return None
opener=urllib.request.build_opener(NoRedirect)
def call(path,method="GET",body=None,headers=None,origin=base):
    req=urllib.request.Request(origin+path,data=body,method=method,headers=headers or {})
    try:
        with opener.open(req,timeout=15) as r:return r.status,r.headers,r.read()
    except urllib.error.HTTPError as e:return e.code,e.headers,e.read()
for path in ["/","/about","/company","/forgeoria","/health","/brand/forgeoria-logo.png"]:
    code,h,data=call(path)
    assert code==200,(path,code)
    assert "noindex" in h.get("X-Robots-Tag","")
print("PASS: marketing routes, logo and staging noindex")
code,h,_=call("/forgeassist?lang=fr")
assert code==301 and h["Location"]=="/forgeoria?lang=fr",(code,h.get("Location"))
assert call("/api/autopilot/admin/leads")[0]==404
assert call("/api/contact")[0]==503
assert call("/api/autopilot/leads")[0]==403
assert call("/api/autopilot/leads","POST",b"{}",{"Content-Type":"application/json"})[0]==400
assert call("/api/autopilot/leads","POST",b"x"*20000,{"Content-Type":"application/json"})[0]==413
print("PASS: real legacy 301, admin blocked, contact disabled, validation and body limits")
values={}
for line in pathlib.Path("/home/debian/agency-autopilot-staging/.env").read_text().splitlines():
    if line and not line.startswith("#") and "=" in line:
        k,v=line.split("=",1);values[k]=v
headers={"Authorization":"Bearer "+values["ADMIN_TOKEN"]}
code,_,data=call("/api/admin/leads",headers=headers,origin="http://127.0.0.1:3280")
assert code==200
items=json.loads(data)["items"]
found=[x for x in items if x["email"]=="forgeoria-browser-20261020@example.invalid"]
assert len(found)==1,"Expected exactly one synthetic browser-test lead"
assert found[0]["company"]=="Entreprise fictive de validation"
assert found[0]["consentVersion"]=="2026-10-v1"
assert call("/api/admin/leads/"+found[0]["id"],"DELETE",headers=headers,origin="http://127.0.0.1:3280")[0]==204
print("PASS: browser submission persisted in real CRM with consent; synthetic record removed")
