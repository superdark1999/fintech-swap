import React, {useRef} from 'react'
import {HotArtistsStyled} from './styled'
import Crown from 'assets/images/crown.svg'
import Checkmark from 'assets/images/checkmark.svg'
import { RightCircleOutlined } from '@ant-design/icons'


const dataMock = [
  {
    avt: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFBgUFBQYEhgUGxwYGBoaGBoZGxgTGhgaGxkZGxsbITskHB0qIBsZJTclLC8xNjQ0GiM6PzozPi0zNDEBCwsLEA8QHxISHTMqIyo1MzkzMTMzMzM1NTEzMzMzNDMzPTMzMzMzMzMzMzwzMzMzMzMzMzMzMzMzMzMzMzEzM//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQHAv/EAE0QAAICAQEEBwMIBQgGCwAAAAECAAMRBAUSITEGE0FRYXGBIjJSFEJicoKRobEjM3OSwRUWQ1ODk6KyNFRjs7TRByREdJTCw9LT4fD/xAAZAQEAAwEBAAAAAAAAAAAAAAAAAgMEBQH/xAAoEQACAgICAQQBBAMAAAAAAAAAAQIDBBEhMRIiMkFRYRNxgZEFFFL/2gAMAwEAAhEDEQA/APZoiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgGInJrddXSu9bYtY5AseZ7gObHwHGV/UdKXY4opOPjtJQHxWse2fJtySjCUnqKIykl2y1yPr2iu+9Tfo2rwRvEAPWRwsU9ozlT2gjjzGaiL9ZqXKJazEY39w9RUmeIBdQbN4g+6GJ78ZEavoXaw3s0uw4qT1m+D9dy295EYM9cPF6bPFLfKRbLNu6Vfe1NK+dqf85q/nLo/9ap/vF/5yi16h62Nd9LVunPcTII7G3VycHvG8PHPAdlN4cZUkjlxVl/BhNMMSMltSKZ3yi9NF1p21pn93UUt5WIfyM7lbPEcZ569at7yhvMA/nNSaOteKA1HnmtmrOfNCJKWDL4ZFZS+UekxKJRtLVV+5f1g+G1Q4x4MuH9SWkppOlS5xqKzT9NT1lfqQAy+q4HfM88ece0XRtjLploiaqbldQyMGVuIKkEEd4I5zbKS0REQBERAEREAREQBERAEREAREQBETn1epSpGexgqIMsTyAgG12ABJOAOJJ5ASEfX26gEaPdROzUOpZD+zQEGwfSJC929KltvbB1bilnaut2CdUgLWdXzZ7FQFs7oO6mMAlc5PK3VWXOqpp6vk1agKHtHtBAABuVA55cPbK4x7pnsotdniaZVtr7Ou07B3ZdbbYGxgOLd1RlmCe0Ag4Z3d0DIwCSBPh7iawyFXZ91UI91rLCFT7JZh6S86HZqVZI3nd8b9jned8csnkAOOFACjPACVXU6MVbRpqAwlthuQdgK12NYo8A4R/t+E0VZPjFxf1wUzpUmmv5LZsvQLRWta8d3mTzZzxZm8Scn1ndETMXkXtnZS3pjO468a3xxR/4qeRHaPTFNqckHeXcZSVdfhsU4YZ7Rnke0YPbPQ2YDieEqe2Nku2rHVWJX8oQuxdC4L1binAV14lXXt/o5pxrv03z0U3V+S47IyJJ/zW1H+tV/+Gb/AOafFnRzVAcLKLT4o9X4hn/KbVmVmX/WmR8T71Gj1FfGzTuR2tWRao9Bh/8ADOem9HzusDjmO1T3MDxU+Bl0boS6ZU65x7R9Ub9bF6HNTE5IAyjn6acj5jB8ZPaTpUnCu5Slx4Ki5cWnl+jPfnsbGO/HGVj5Q1nCrGO2wjK/YHzz48vPlPtdFXggjf3veZuLMRyOezHZjGOzEz248bOY8fkurucV6i/aM2n2rQEzyRTvbo+k3a3lwHjznZKjsbbjVstWoYsjELXax4gngEsPeeQft5Hjxa3TmzhKEtM2xmpLaMxESJIREQBERAEREAREQBERANNtgVSzEKFBJJ4AADJJPdKLr9c2qcOwK1Ic0oeGf9q4+I/NHzR4k4kOk+v6x/kynKJhrsfObgVq8uTN4bo7TIq21UG8xwP4ngAB2k9w5zdjUr3y6+DJkWP2xJLo1Xvatm/qqvxtfn91Z+8y5SkbHOorOpdKM2tVU1VbsFLqGtHtfCefs57s4zw+6unyKN2/SamqwcGQV7wz9Ekgkeky3SUptovqi1FIukrfSR0Fmiu3gQmpCZByMW1vWRn627InU7U1+uHV6WhtHU3B7rfZfdPPcXy7RnzHOd+q2BVVpKdIudzrVGfnF2JLP4NklhjlgSrssJ3W7VopZEttSs2Z3AzBd7GM8/MffPrUbTprUs9qIo7S6gfnIqvTVaxDTq61stp9lwRggkYFiEcQrgZBB7xzBmijoFs9G3hp8nuL2MPUFsH1jk94Ijam0H2ox0ul3hpwR8ovIIDKDncQHn5dvDPDnZtTSFu0lacOr6xgOf6NKurwT5ukkq60rTCha0UcgAqqo8uAEjNkA22PqjwVlCUA8D1IOS+OzfbiPoqkHhNRPljOPV6llVii77AeyuQu8ewZPADxhvRJRb6PvXa5Kl3nOMndUAFmZjyVVHFmPcJCarYXyw7+qTqgAQiKR1gBHOyxef1ASveW7N2iow/W2sLLiMb3zUU80rU+6veebY4ngAJWq+EyTrZT9obLt0wyf01Q+eq+2q/TReBH0l9VA4zQjAgEEEHiCDkEHkQZ6ArZlG2/pqqXL0Op3jmzToQzDPOytF4jvZeR4kcc726jKafjLr7MN2NvmPZzugYFWAYEYIPEEHmCJMdGNplSNLYS3D9C5OSygca2PayjiD2r4qZXU1bOAaqyysMhnYIpB5EYy34CYfTWOPas6sghl6tQN11OVbebJOD3Ymm+tWx4XPwyiqThLk9OESI6N68W0KeIdDuWAsWK2KBvcWOSDkMPBhJeclrXB0TMREAREQBERAEREAjdTrLKyS1JdPirO+wH0kIBP2d4+E06vblS6d7kZbNwYABwetOAqMDxVixUYPHjJeUrplUll9aYCsimx3XCuBndrUt2rnrGweGUElCPlJIjOWlsjFPVpliXdmycDLWWucndHaWY8B/ASzbC2FuEXX4e3mo5pSCOS97Y5t6DA5w/R/S3KV1VlZ1CEHqt0hbFQnHWbhwrFl7QQQvIe0RLbotpV2g9W4JX3lIKup7mRsMp8xL779+iPSK6qtep9s5NrnqrK9V81A1d3hU5BDnwRlBPcrOeySqMCAQcg8QRyIn1kGRP8iBf1F1umXOdyvq2QfVWxGCDwXA8JlLj56Q7ZGmrDY33c7taZxvNz4nsUDiT6cyJRNftbVu4NlrIyMHVVRFVGwQCAwJPAnmTO7phpmrupLW2Wko5DOU4MGQnAVQo+byHHHhIbU6h3beY5J4eg5cplvsafiuDv/4zDhOCnJJ7338E/snaxvsWvUMVt4inUJhGzjJrce62cZwRund5AgE2pV1i8N6i36RD1nHiBvAnyxPNtGpN1Kr7xuqx9l1Yn0VWPkDPXgZbTJyjyYP8ljxpu1Hprr6Ij+S3sOdTYHUf0SLuVnu38ktZjuJC/RkwZmfLS455zXviRWo1EkNWOEgdYTmVTejfjQTNpvmmu7UMSFNdS5OG9qxiM88eyFP3zjDmdujOcStS2bLKkonfp9lK+Otssv8ABnKp2cNxMKR5gyX02krrXdrRa17lUKPuAnNoxx9P/wB+U62uQc2UeZAl8ejj2LUimbb2f8ntDIMVXk4HYl/Fivgr8SO5g3xCc0s+2b9LbU9VmoqTfHAmxAVcHKsMnmGAI8pStPtGsqN+xA4yrgOuN9SVYj6JIyD3ETqYd214t9HOya9PySJfYup6rUr8Go/Rv3CxQWrb19pPHeTul4nmV962KRXYpcYZMEHFineQ/vAT0PZ+rFtaWrysRXHkwBx+Mz5cEp7XyX48m46fwdcREyl4iIgCIiAJpvvVBliQPIn8hN0QCNr21pmO6NRVvfCXUN+6TmVDVJ8q1joDlbLNwkdmmpRes9C5dc/7QS+WVqwwyhh3EAj7jKH0L2VVa11rJjiFBQtWwZ2exsMhBHsvWOfzZKEvHbIyjsveQoxyA4AdwEido6auwhmXDr7rqSrr9V14geHI9onPrdAy/q9RcmOOGYWg+B6wFv8AFI1brQSLHR+4qhQ+vtESmU9G2ijyJ7Z7uq7r2daQeDboVivZvY4FufEAeUkq7MytaW45k5pmzEZbF1PgaNu7IXVV7jEqyneRhjKPjGcHmMEgjtB9ZRdodGtVUj2EVOtas5YOwyqqSfZK8Dw5ZPnPTpp1dO/W6H56sv7wI/jPZ1xl2Roy7adqD0V7o30bFJ66xhZYRhd33EU893PFifiOOHIDjm0Tg2NeX09LngXrRiO4lBkffO6SjFRWkU2WSsk5Se2fUwZmJ6QOe+vIkNrNKZYJqspBkZR2XVWuDKr8kOeU66NEGBVhvBhgg8iDzBkz8kmxKMSCho0WZfktEZT0e0uONFZ81yPuM3VdH9Ivu6Wgf2SZ+/EkxMyxIxN7eznr0VS+7Wi+SqPyEp+3KOr1b4GBci2D66+w/wCArPqZeJVumKYfTP8ASsr9HTf/ADrEvx3qxFVq3FkPmWPohZnTBf6p7E8lDkqPRSolck50Nb2dQO67h601H88zbmr0p/ky4r9TRZoiJzDcIiIAiIgCInxYTg4GT2DOM+vZAPoyp/8ARyP+pb3Imx8/Z3U/JBJk16l/edKB3Ipsf0d8L/gMr3RHYtRrtrtXrTVqLU3XYsnB95T1ZO5khgc7s8BJ67a1GSq2CxweKVg2MO4FUBK+uJFDecnNb1js393Ld/sgkjs54ll2hatNYCICWISutcKGdvdXuA5knsAJ7JwfyLY/Gy9949lYVEXwXKlj5sT6cpGUNmujI8Dn0tBzJzRpwz38Zo0WgKLutY1nHgWCg47juAA9vHEkVXE8jHRG67zPoTMRLDMRWwRuo9f9VbYmO5S5esfuOklZE0+xq7F5C9FsXxev9HZ/hNMloAiIgCIiAIiQ+p1zuxp0+N5eFlhGVpz2fSsxyXs5t2BgMbRuNrfJqmIJx17j+jrI90HssccB3AlvhzK1oFUKowFAAA7ABgCaNDo1qQIme0kk5ZmPFmY9rE8zOuAYlc6Ze5R+2H+6tljlX6YnLaZPpu+PBa2X87FllXvX7kLPayGk50MX2dQ3fd+VFQkHLJ0Prxpg39Y9j/ZLsF/whZvzn6UvyZMVepsnoiJzDcIiIAiIgCIiAJX9mDqtbqqzwW4JqU8Tuiu37ilZ+3LBIbbo3Or1QH+jsS/Dj8ncbtvovsv/AGcA2a4Z1OmB5DrWH7QIAvrus8lJG7WoZkWysbz0sLEHxYBVkB5e0jMoPeQZ06LVrai2Id5W9CCOBBB4gg5BB4gjEA6oiIAiIgERt0FAmoH/AGdt5/2Dezb6BTv/AGBJafFiBgVIyCMEHkQeYkZsNyobTOSX0+FBJ4vQc9U/j7IKk/EjQCXiJyazXV1AGx1TPAZPFj3KObHwEA65y6zWJUu/Y4ReWSeZPIAcyT2AcTOI6y+z9TV1Sn+kuBBx3rUPaP2inrNmk2Sit1jlrrcY6x8EgdoRR7KDwUDPbmAaT12o+LTU/u3WD/0lP7/H5hEktNp0rUIihFXkAMATfEAREQDEpXSG3f1ZHZRWF/tLDvMP3Vr++W7V6ha0axzuqilmPcqjJlAoZm3rHG69rF2HwluS/ZUKv2ZqxIeU9/RRkS1HX2Y1bkI27xY+yg77GIVB6sRL9oNKKqkqXlWqoPJVA/hKfsXTdbqVGPY0/wCkfuNhytS/5n8N1e+XmMuflPX0eY8NR39mYiJlNAiIgCIiAIiIAmt1BBBGQeBB5EHsmyIBC7Hc1MdK5P6Mb1LH5+nzgDxZMhT4bh+dPvVbKO+bKLDp3bi2AGrcjhmxDwJxgbylW4DjgTo2poetUbrbllZ363xndcDHEdqkEgjtBM+NlbQ60Mrr1dtZAsTPuseRU/ORuat28eRBAA0rrNTXwt0/Wj46GB9TXYQy+QLTP8vUD3y9WOH6Sqysfe6gHzBkvEAiv5w6P/W9OPO5B+BaP5w6Ts1NLfVsVz9ykmSeBMwCK/lysnCLdYfo0W4P2yoX8Zxav5Ra6W06c0uhxv3Oqh6iRvoVrLEg4BGcYIB7wbHE8BDjQ6h/1up3R8FCCsY7i7lmPmu7OrR7MqqJKVgMeBc5Z2H0nbLN6md0T0CIiAIiIBiIkPt3a4oQBQHtsyK18Rzdu5F4ZPkOZnqTb0jxvRFdKtbvuulU+yMWXeQ411+ZI3iO5R8Uh77N1c4LHgFUc2cnCqPEkgDzmK03QSzbzMS7uebOfeY93l2AAchJnozs42MuqcYRf1CntyMG4+YyF8CT87h0E1RX+WY3u2f4RMdH9mdRUFbBsc79pHbawGQPogAKPBRJUxE57bb2zauDMRE8AiIgCIiAIiIAiIgCRm09m9YVsRjVdXncsAzwPNHX59Z7VPmCCAZJxAIrQ7Ty3VXL1N2M7ucrYBzapvnDvHvDtHImVnHrdElq7li7wzkcwQw5MrDirDsIIMidbrbdGu/Y3ymgEDJwLkyQAMe7bz+i31oBYIzKNr+mztkaeoJ9K3ifMVqfzYeUrmu2vdZ+u1DkH5obcXy3UxveuZB2JGqGHZLl8L8npms21p6eFt9aH4Sw3v3ef4SI1HTbTL7i22/VrKj77CspOj2Ta36rTWEfU6sH1swDJH+a+r3S7JXWqgs2/ZxAAyeCKQfvkP1JPpFqx6Y+6f8ARKanp6Rjc03PgN+0Kc+CorZPhOW/prqgcdXXVnl1iW8fLeK5kbsS1kUMFRbXALEo99iq3FV6uv8AVpjHvMM8yBJTUPc6FXR3VuYbTKykfVFm9/GY5ZUlLQ/TqT4W1+5zHpbrD8+oeVR/jYZ8npTrP61f7tZu6NdH6bxYr2W71TAezmv2GGUyrrvgjDDiT7uc8ZYB0J0vb1p/tWH5TVFSktpknbjrjwKz/OrWf1ietY/gZsr6YawczS3nW4/EWfwll/mXpPhs/vrP/dI3bXQtBXv6c2b6HeKdYTvr2qpbk3aOwkYPPImoT+yLuxv+Gcq9OLwOOnrc45ixk49nAoeHrIiva4Zme4ObHxvvuhhgclUISVQdgx4nJJMwmy0dQyWWAMMj3D+BTMw2yXHu2A/WT+Kt/CbK6cit+UUmZLLcOxae0TuwNnjVnrGIOnRsBOZtdT88fNrHD2Txbt9n3r0BPO+jWsfSNYbV367CpJrJYoygguUKgsCN0HGSNwcD2X/TahbEDowdWGVYHII7wZCxzb3NaZTFQjxB7X2b4iJWSEREAREQBERAEREAREQBERANVtgUFmIUAEkk4AA5knsEofSPaL6tQtSqtaMGVn3gbSMjKge4mCcEgk8OAHEynSvVb7rpgfZA6y0fEN7FaHwJVmP1AORkUJsx8ZTTcujPZkOEl49oiaNjk8bHJ+hWSo9W94+mJZ+heyEUtqQirvZSvAHuKcO+eZLMDx+FV75AVO9leAcNbZ1aEY9lWfq1b0GXnpOmpWtFrUbqoAqjuUDAH4SORCEEowWvknC2yxuU5bN006qkOjIeTqVPkwIP5zfEylpSdDpyNO1CYosrU1vuj3Ld3G/jtzwcHtBkb0R2ddWbWtuLjeKbu87AMjcXy/LI/A8Zdtdsmu1g53kcDAdCVbd7iRwZfBgROKro1UCxd7Lg5DMjsoRmAC5ZUUBuAAwcg45TnSw5benw/wCzSrlpbXI6Orvm28e7YVSs/FXWG9seBZnx3gA9snp8quBgcMT6m6uCjFRXwZ5Pb2JmIkzwo+29F1OoJXgmoy6juuHGxftD2/MPOWWbpdRvaV37aCLh5V8W+9N8esrM6uHZ5R8X8GDJhqW18ibdm686azezimw/pV7EY8BavcPi8Pa7DnVMMoIIIyDwI7weYl91anHTKa5uMuD0KZkF0T1RfTKrHLUs1TE8zuHCk+JQofWTk4jWno6iezMRE8PRERAEREAREQBERAExMxAKLtfPyu/P0N36nVr/AObfnMzYBPcMyW6V6bcsS8e64FTn4WBJrJ8CWZfNlkSVzw7+E62LJSq0vg518dT2Oi9Aa3Sr2V1tZ6qip68bM+k9Cnn3RW/dt0xPzkeg+DgKfzqI9Z6DMGT7/wCDXT7TMREoLhERAEREAREQDm1lYat1PJlZT5FSDPOKQ1lCFW3HKVuD2b26Dhu9TyI8Z6BtnU9Xp7bPgRiB3tg7o8ycD1lGTFVY7q0/BF/+ptwl3sy5L6MaPVrYDjgyHDoTxRuIIPeMg8e3E6Jz6CvdqQHnujePex4sfViT6zbbYFUsxwFBJPgJ0U/TtmOXfBO9Cgcanu6/h/cU5/GWeRHRnRGrTqGG69hNjjudzvbp+qML9mS84c3uTZ1ILUUjMREiSEREAREQBERAEREAREQCG6Xf6Fqf2T/5ZVV5CInQwemY8rtHJs73q/8AvY/4iemxEz5Pv/guo9pmIiZy4REQBERAEREAgemf+iN+0o/4iuVLaX6qz9m/+QxE34ftkZMjtHQvIeU06zkn7Wn/AHyRE3WexmWPuX7npAmYicI6oiIgCIiAf//Z",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
]
function HotArtists() {
  const divRef = useRef<HTMLDivElement>(null);
  const scroll = () => {
    console.log("scrollleft")
    divRef.current.scrollLeft += 260;
  };
    return (
        <HotArtistsStyled>
            <div className="header-artists" >
                <div className="title-artists">HOT ARTISTS 🔥</div>
                <div className="more-artists">View more</div>
            </div>
           
            <RightCircleOutlined className="scroll-left" onClick={scroll} style={{ fontSize: 24 }}/>              
            <div className="content-artists" ref={divRef} > 
              {
                dataMock.map((item, i) => (
                  <div className="card-artists" key={i}>
                    <img className="avatar-artists" src={item.avt} alt=""/>
                    <div className="name-artists">
                      {item.name} {" "}
                      <img src={Checkmark} />
                    </div>
                    <div className="rank-artists">
                      <img src={Crown} /> {" "}
                      {item.rank}
                    </div>
                    <div className="line" />
                    <div className="list-image">
                      { item.images.map((img) => (
                          <img src={img} className="image" />
                      ))
                      }
                    </div>
                  </div>
                  )
                )}
              </div>
            
        </HotArtistsStyled>
    )
}

export default HotArtists
